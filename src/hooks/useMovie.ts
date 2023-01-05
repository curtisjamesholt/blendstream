import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Movie } from "./usePublishMovie";
import { useQuery } from "@tanstack/react-query";

const useMovie = (id: string) => {
  const supabase = useSupabaseClient();

  const fetchMovie = async () => {
    if (!id) return null;
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data[0] as Movie;
  };
  const { data, error, isLoading } = useQuery<Movie | null>(
    ["movie", id],
    fetchMovie
  );

  return {
    movie: data || null,
    error,
    isLoading,
  };
};

export default useMovie;
