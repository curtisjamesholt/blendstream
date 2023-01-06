import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

interface Profile {
  id: string;
  full_name: string;
  website: string;
  profile_picture: string | null;
  is_moderator: boolean;
  watchlist: string[] | null;
  favorites: string[] | null;
}

const useUser = (uid: string) => {
  const supabase = useSupabaseClient();

  const fetchUser = async () => {
    if (!uid) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid);
    if (error) {
      throw new Error(error.message);
    }
    return data[0] as Profile;
  };
  const { data, error, isLoading, refetch } = useQuery<Profile | null>(
    ['profile', uid],
    fetchUser,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return {
    profile: data || null,
    error,
    isLoading,
    refetch,
  };
};

export default useUser;
