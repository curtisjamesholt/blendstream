import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export interface Movie {
  id: string;
  created_at: string;
  creator: string;
  title: string;
  url: string;
  description: string;
  published: boolean;
  tags: string[];
}

const usePublishMovie = () => {
  const supabase = useSupabaseClient();
  const session = useSession();

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
    if (!title || !description || !url) return;
    try {
      const { data, error } = await supabase.from('movies').insert({
        title: title,
        description: description,
        creator: creator ? creator : session.user.id,
        url: url,
        tags: tags,
        published: true,
      } as Movie);
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
