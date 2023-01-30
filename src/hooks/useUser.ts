import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export interface Profile {
  id: string;
  full_name: string;
  bio: string;
  profile_picture: string | null;
  is_moderator: boolean;
  watchlist: string[] | null;
  favorites: string[] | null;
  website: string;
  twitter: string | null;
  instagram: string | null;
  youtube: string | null;
}

export const isUuid4 = (text: string) => {
  const uuid4Regex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return uuid4Regex.test(text);
};

const useUser = (uid: string) => {
  const supabase = useSupabaseClient();

  const fetchUser = async () => {
    if (!uid || (uid && !isUuid4(uid))) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid);
    if (error) {
      throw new Error(error.message);
    }
    return data.length > 0 ? (data[0] as Profile) : null;
  };
  const { data, error, isLoading, refetch } = useQuery<Profile | null>(
    ['profile', uid],
    fetchUser,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const [updatingProfile, setUpdatingProfile] = useState<boolean>(false);
  const updateProfile = async (
    username: string,
    bio: string,
    website: string,
    twitter: string,
    instagram: string,
    youtube: string
  ) => {
    setUpdatingProfile(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: username || 'Unknown',
          bio,
          website,
          twitter,
          instagram,
          youtube,
        })
        .match({ id: uid });
      if (error) {
        throw new Error(error.message);
      }
      await refetch();
    } catch (error) {
      console.error(error);
    }
    setUpdatingProfile(false);
  };

  return {
    profile: data || null,
    error,
    isLoading,
    refetch,
    updateProfile,
    updatingProfile,
  };
};

export default useUser;
