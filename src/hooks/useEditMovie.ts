import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { Movie } from './usePublishMovie';
import { isUuid4 } from './useUser';

const useEditMovie = () => {
  const supabase = useSupabaseClient();

  const [deletingThumbnail, setDeletingThumbnail] = useState<boolean>(false);
  const deleteCustomThumbnail = async (id: string, thumbnail: string) => {
    setDeletingThumbnail(true);
    try {
      const { error } = await supabase.storage
        .from('thumbnails')
        .remove([thumbnail]);

      if (error) {
        throw error;
      }
      const { error: error1 } = await supabase
        .from('movies')
        .update({ thumbnail: '' })
        .match({ id });

      if (error1) {
        throw error1;
      }
    } catch (error) {
      console.log(error);
    }
    setDeletingThumbnail(false);
  };

  const [deleting, setDeleting] = useState<boolean>(false);
  const deleteMovie = async (id: string, thumbnail: string) => {
    setDeleting(true);
    try {
      if (thumbnail) {
        await deleteCustomThumbnail(id, thumbnail);
      }
      const { error } = await supabase.from('movies').delete().match({ id });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
    setDeleting(false);
  };

  const [updating, setUpdating] = useState<boolean>(false);
  const updateMovie = async (
    id: string,
    data: Partial<Movie>,
    thumbnailFile: File | null,
    creatorPicture: string | null
  ) => {
    setUpdating(true);
    try {
      // add thumbnail to storage
      if (thumbnailFile) {
        const { data: newThumbnail, error: error1 } = await supabase.storage
          .from('thumbnails')
          .upload(`thumbnail-${new Date().getTime()}`, thumbnailFile);
        if (error1 || !newThumbnail) {
          throw error1;
        }
        data.thumbnail = newThumbnail.path;
      }
      // add creator to profiles
      if (data.creator && !isUuid4(data.creator)) {
        const { data: newUser, error: userError } = await supabase
          .from('profiles')
          .insert([
            { full_name: data.creator, profile_picture: creatorPicture },
          ])
          .select('*')
          .single();
        let newUserData = newUser as any;
        if (userError || !newUserData) {
          throw new Error(userError?.message || 'No user data');
        }
        data.creator = newUserData.id;
      }
      // update movie
      const { error } = await supabase
        .from('movies')
        .update(data)
        .match({ id });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
    setUpdating(false);
  };

  return {
    deleting,
    deleteMovie,
    deletingThumbnail,
    deleteCustomThumbnail,
    updating,
    updateMovie,
  };
};

export default useEditMovie;
