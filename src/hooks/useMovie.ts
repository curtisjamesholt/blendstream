import {
  SupabaseClient,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Movie } from './usePublishMovie';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../utils/supabase';

export const getMovie = async (id: string) => {
  if (!id) return null;
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  return data[0] as Movie;
};

const useMovie = (id: string) => {
  const fetchMovie = async () => {
    const movie = await getMovie(id);
    return movie;
  };
  const { data, error, isLoading } = useQuery<Movie | null>(
    ['movie', id],
    fetchMovie
  );

  return {
    movie: data || null,
    error,
    isLoading,
  };
};

export default useMovie;
