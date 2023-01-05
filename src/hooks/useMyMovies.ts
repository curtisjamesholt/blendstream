import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Movie } from "./usePublishMovie";
import { useQuery } from "@tanstack/react-query";

const useMyMovies = () => {
  const supabase = useSupabaseClient();
  const session = useSession();

  const fetchMovies = async () => {
    if (!session?.user.id) {
      return null;
    }
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .eq("creator", session.user.id)
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data as Movie[];
  };
  const { data, error, isLoading } = useQuery<Movie[] | null>(
    ["my_movies", session?.user.id],
    fetchMovies
  );

  return {
    movies: data || [],
    error,
    isLoading,
  };
};

export default useMyMovies;
