import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { Movie } from './usePublishMovie';
import { useState } from 'react';

const useSubmissions = () => {
  const supabase = useSupabaseClient();
  const session = useSession();

  const fetchSubmissions = async () => {
    if (!session) return [];
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .filter('published', 'eq', false)
      .order('created_at', { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data as Movie[];
  };
  const { data, error, isLoading, refetch } = useQuery<Movie[] | null>(
    ['submissions', session?.user?.id],
    fetchSubmissions
  );

  const [updatingSubmission, setUpdatingSubmission] = useState<boolean>(false);
  const updateSubmission = async (movie: Movie) => {
    if (!session) return;
    setUpdatingSubmission(true);
    try {
      const { data, error } = await supabase
        .from('movies')
        .update(movie)
        .match({ id: movie.id });
      await refetch();
    } catch (error) {
      console.error(error);
    }
    setUpdatingSubmission(false);
  };

  const [deleting, setDeleting] = useState<boolean>(false);

  const deleteMovie = async (id: string) => {
    if (!session) return;
    setDeleting(true);
    try {
      const { data, error } = await supabase
        .from('movies')
        .delete()
        .match({ id });
      if (error) {
        throw new Error(error.message);
      }
      await refetch();
    } catch (error) {
      console.error(error);
    }
    setDeleting(false);
  };

  return {
    movies: data || [],
    error: error,
    loading: isLoading,
    updateSubmission,
    updatingSubmission,
    deleteMovie,
    deleting,
  };
};

export default useSubmissions;
