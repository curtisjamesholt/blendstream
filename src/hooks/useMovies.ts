import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Movie } from './usePublishMovie';
import { useQuery } from '@tanstack/react-query';

export const useMoviesById = (ids: string[]) => {
  const supabase = useSupabaseClient();

  const fetchMovies = async () => {
    if (!ids.length) return null;
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .in('id', ids)
      .filter('published', 'eq', true)
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

  return {
    movies: data || [],
    error: error,
    loading: isLoading,
  };
};

export const useRecentMovies = () => {
  const supabase = useSupabaseClient();

  const fetchRecentMovies = async () => {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .filter('published', 'eq', true)
      .order('created_at', { ascending: false })
      .limit(10);
    if (error) {
      throw new Error(error.message);
    }
    return data as Movie[];
  };
  const { data, error, isLoading } = useQuery<Movie[] | null>(
    ['recentMovies'],
    fetchRecentMovies
  );

  return {
    recentMovies: data || [],
    error: error,
    loading: isLoading,
  };
};

export const useMoviesByCategory = (category: string) => {
  const supabase = useSupabaseClient();

  const fetchMoviesByCategory = async () => {
    if (!category) return [];
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .filter('categories', 'cs', `{${category}}`)
      .filter('published', 'eq', true)
      .order('created_at', { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data as Movie[];
  };
  const { data, error, isLoading } = useQuery<Movie[] | null>(
    ['moviesByCategory', category],
    fetchMoviesByCategory
  );

  return {
    movies: data || [],
    error: error,
    loading: isLoading,
  };
};
