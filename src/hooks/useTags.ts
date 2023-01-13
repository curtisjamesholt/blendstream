import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';

export interface Tag {
  tag: string;
  title: string;
  order: number | null;
}

const useTags = () => {
  const supabase = useSupabaseClient();

  const fetchTags = async () => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('order', { ascending: true });
    if (error) {
      throw new Error(error.message);
    }
    return data as Tag[];
  };
  const { data, isLoading, error, refetch } = useQuery(['tags'], fetchTags, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const [togglingTag, setTogglingTag] = useState<boolean>(false);
  const toggleTagOrder = async (tag: Tag) => {
    setTogglingTag(true);
    try {
      const { error } = await supabase
        .from('tags')
        .update({ order: tag.order !== null ? null : 0 })
        .match({ tag: tag.tag });
      if (error) {
        throw new Error(error.message);
      }
      await refetch();
    } catch (error) {
      console.error(error);
    }
    setTogglingTag(false);
  };

  const updateTagTitle = async (tag: Tag, title: string) => {
    try {
      const { error } = await supabase
        .from('tags')
        .update({ title })
        .match({ tag: tag.tag });
      if (error) {
        throw new Error(error.message);
      }
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const [movingTag, setMovingTag] = useState<boolean>(false);
  const moveTag = async (tag: Tag, offset: number) => {
    setMovingTag(true);
    try {
      const { error } = await supabase
        .from('tags')
        .update({ order: tag.order !== null ? tag.order + offset : 0 })
        .match({ tag: tag.tag });
      if (error) {
        throw new Error(error.message);
      }
      await refetch();
    } catch (error) {
      console.error(error);
    }
    setMovingTag(false);
  };

  const addTag = async (tag: string, title: string) => {
    try {
      const { error } = await supabase
        .from('tags')
        .insert([{ tag, title, order: 0 }]);
      if (error) {
        throw new Error(error.message);
      }
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const removeTag = async (tag: string) => {
    try {
      const { error } = await supabase
        .from('tags')
        .delete()
        .match({ tag: tag });
      if (error) {
        throw new Error(error.message);
      }
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    tags: data || [],
    isLoading,
    error,
    refetch,
    toggleTagOrder,
    togglingTag,
    updateTagTitle,
    moveTag,
    movingTag,
    addTag,
    removeTag,
  };
};

export default useTags;
