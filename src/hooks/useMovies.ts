import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Movie } from './usePublishMovie';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

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
      .order('published_at', { ascending: false, nullsFirst: false })
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

    return data as Movie[];
  };
  const { data, error, isLoading, refetch } = useQuery<Movie[] | null>(
    ['featuredMovies'],
    fetchFeaturedMovies
  );

  const shuffled = useMemo(() => {
    const shuffled = JSON.parse(JSON.stringify(data || [])).sort(
      (a: Movie, b: Movie) => 0.5 - Math.random()
    ) as Movie[];
    return shuffled;
  }, [data]);

  const [removing, setRemoving] = useState<boolean>(false);
  const removeFeaturedMovie = async (id: string) => {
    setRemoving(true);
    try {
      await supabase.from('movies').update({ featured: false }).match({ id });
      await refetch();
    } catch (error) {
      console.error(error);
    }
    setRemoving(false);
  };

  const addFeaturedMovie = async (id: string) => {
    try {
      await supabase.from('movies').update({ featured: true }).match({ id });
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    featuredMovies: data || [],
    shuffledFeaturedMovies: shuffled,
    error: error,
    loading: isLoading,
    removeFeaturedMovie,
    removing,
    addFeaturedMovie,
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
    fetchMoviesByCategory,
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    }
  );

  const shuffled = useMemo(() => {
    const shuffled = JSON.parse(JSON.stringify(data || [])).sort(
      (a: Movie, b: Movie) => 0.5 - Math.random()
    ) as Movie[];
    return shuffled;
  }, [data]);

  return {
    movies: data || [],
    shuffledMovies: shuffled,
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
  const { data, error, isLoading, refetch } = useQuery<Movie[] | null>(
    ['filteredMovies', search],
    fetchFilteredMovies
  );

  return {
    movies: data || [],
    error: error,
    loading: isLoading,
    refetch,
  };
};
