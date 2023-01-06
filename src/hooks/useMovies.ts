import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Movie } from './usePublishMovie';
import { useQuery } from '@tanstack/react-query';

const useMovies = (ids?: string[]) => {
  const supabase = useSupabaseClient();

  const fetchMovies = async () => {
    if (!ids || !ids.length) return null;
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .in('id', ids || [])
      .in('published', [true])
      .order('created_at', { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data as Movie[];
  };
  const { data, error, isLoading } = useQuery<Movie[] | null>(
    ['movies', ids],
    fetchMovies
  );

  const fetchRecentMovies = async () => {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .in('published', [true])
      .order('created_at', { ascending: false })
      .limit(10);
    if (error) {
      throw new Error(error.message);
    }
    return data as Movie[];
  };
  const {
    data: recentMovies,
    error: recentMoviesError,
    isLoading: recentMoviesLoading,
  } = useQuery<Movie[] | null>(['recentMovies'], fetchRecentMovies);

  return {
    movies: data || [],
    errorMovies: error,
    loadingMovies: isLoading,
    recentMovies: recentMovies || [],
    errorRecentMovies: recentMoviesError,
    loadingRecentMovies: recentMoviesLoading,
  };
};

export default useMovies;
