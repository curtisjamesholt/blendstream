import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Movie } from "./usePublishMovie";
import { useQuery } from "@tanstack/react-query";

const useMovies = () => {
  const supabase = useSupabaseClient();

  const fetchMovies = async () => {
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data as Movie[];
  };
  const { data, error, isLoading } = useQuery<Movie[] | null>(
    ["movies"],
    fetchMovies
  );

  return {
    movies: data || [],
    error,
    isLoading,
  };
};

export default useMovies;
