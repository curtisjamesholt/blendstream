import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { Movie } from './usePublishMovie';

const useUserSubmissions = (uid: string) => {
  const supabase = useSupabaseClient();

  const fetchUserSubmissions = async () => {
    if (!uid) return [];
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .filter('submitter', 'eq', uid)
        .order('created_at', { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data as Movie[];
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const { data, error, isLoading, refetch } = useQuery<Movie[] | null>(
    ['userSubmissions', uid],
    fetchUserSubmissions,
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    submissions: data || [],
    error,
    isLoading,
    refetch,
  };
};

export default useUserSubmissions;
