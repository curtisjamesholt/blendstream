import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

export interface Movie {
  id: string;
  created_at: string;
  creator: string;
  title: string;
  url: string;
  description: string;
  published: boolean;
}

const usePublishMovie = () => {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [loading, setLoading] = useState<boolean>(false);

  const submitMovie = async (
    title: string,
    description: string,
    url: string
  ) => {
    if (!session) return;
    setLoading(true);
    if (!title || !description || !url) return;
    const { data, error } = await supabase.from("movies").insert({
      title: title,
      description: description,
      creator: session.user.id,
      url: url,
    } as Movie);
    setLoading(false);
  };

  return { submitMovie, loading };
};

export default usePublishMovie;
