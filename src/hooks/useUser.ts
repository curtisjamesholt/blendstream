import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface Profile {
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

const useUser = (uid: string) => {
  const supabase = useSupabaseClient();

  const fetchUser = async () => {
    if (
      !uid ||
      (uid && !/[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+/.test(uid))
    )
      return null;
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
        .update({ bio, website, twitter, instagram, youtube })
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
