import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { Movie } from './usePublishMovie';
import { useState } from 'react';
import { Profile } from './useUser';

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

  const [publishingSubmission, setPublishingSubmission] =
    useState<boolean>(false);
  const publishSubmission = async (
    movie: Movie,
    profile_picture: string | null
  ) => {
    if (!session) return;
    setPublishingSubmission(true);
    try {
      if (profile_picture) {
        const { data: newUser, error: userError } = await supabase
          .from('profiles')
          .insert([
            {
              full_name: movie.creator,
              profile_picture: profile_picture,
            },
          ])
          .select('*')
          .single();
        console.log(newUser);
        let newUserData = newUser as any;
        if (userError || !newUserData) {
          throw new Error(userError?.message || 'No user data');
        }
        movie.creator = newUserData.id;
      }
      const { data, error } = await supabase
        .from('movies')
        .update(movie)
        .match({ id: movie.id });
      await refetch();
    } catch (error) {
      console.error(error);
    }
    setPublishingSubmission(false);
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
    publishSubmission,
    refetch,
    publishingSubmission,
    deleteMovie,
    deleting,
  };
};

export default useSubmissions;
