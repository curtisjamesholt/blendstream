import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Movie } from './usePublishMovie';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

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

export const useFeaturedMovies = () => {
  const supabase = useSupabaseClient();

  const fetchFeaturedMovies = async () => {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .filter('published', 'eq', true)
      .filter('featured', 'eq', true)
      .order('created_at', { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    const shuffled = data.sort((a, b) => 0.5 - Math.random());
    return shuffled as Movie[];
  };
  const { data, error, isLoading } = useQuery<Movie[] | null>(
    ['featuredMovies'],
    fetchFeaturedMovies
  );

  return {
    featuredMovies: data || [],
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
      .filter('tags', 'cs', `{${category}}`)
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

export const useMoviesByCreator = (creator: string) => {
  const supabase = useSupabaseClient();

  const fetchMoviesByCreator = async () => {
    if (!creator) return [];
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .filter('creator', 'eq', creator)
      .filter('published', 'eq', true)
      .order('created_at', { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data as Movie[];
  };
  const { data, error, isLoading } = useQuery<Movie[] | null>(
    ['moviesByCreator', creator],
    fetchMoviesByCreator
  );

  return {
    movies: data || [],
    error: error,
    loading: isLoading,
  };
};

export const useFilteredMovies = (search: string) => {
  const supabase = useSupabaseClient();

  const fetchFilteredMovies = async () => {
    if (!search) return [];
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .filter('title', 'ilike', `%${search}%`)
      .filter('published', 'eq', true)
      .order('created_at', { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data as Movie[];
  };
  const { data, error, isLoading } = useQuery<Movie[] | null>(
    ['filteredMovies', search],
    fetchFilteredMovies
  );

  return {
    movies: data || [],
    error: error,
    loading: isLoading,
  };
};
