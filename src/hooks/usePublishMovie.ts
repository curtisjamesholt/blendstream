import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import useSubmissions from './useSubmissions';

export interface Movie {
  id: string;
  created_at: string;
  creator: string;
  title: string;
  url: string;
  description: string;
  published: boolean;
  featured: boolean;
  tags: string[];
  thumbnail: string | null;
  submitter: string;
  published_at: string | null;
}

const usePublishMovie = () => {
  const supabase = useSupabaseClient();
  const session = useSession();

  const { refetch } = useSubmissions();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const submitMovie = async (
    title: string,
    description: string,
    url: string,
    creator: string,
    tags: string[]
  ) => {
    if (!session) return;
    setSubmitting(true);
    if (!title || !url) return;
    try {
      const { data, error } = await supabase.from('movies').insert({
        title: title,
        description: description,
        creator: creator ? creator : session.user.id,
        url: url,
        tags: tags,
        submitter: session.user.id,
      } as Movie);
      await refetch();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

  return { submitMovie, submitting };
};

export default usePublishMovie;
