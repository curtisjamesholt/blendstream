import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import useUser from './useUser';
import { useState } from 'react';

const useFavorites = () => {
  const supabase = useSupabaseClient();

  const session = useSession();
  const { profile, refetch } = useUser(session?.user.id || '');

  const [togglingFavorite, setTogglingFavorite] = useState<boolean>(false);

  const toggleFavorite = async (id: string) => {
    if (!session || !profile) return;
    setTogglingFavorite(true);
    let newFavorites = [...(profile.favorites || [])];
    if ((profile.favorites || []).includes(id)) {
      newFavorites.splice(newFavorites.indexOf(id), 1);
    } else {
      newFavorites.unshift(id);
    }
    const { data, error } = await supabase
      .from('profiles')
      .update({ favorites: newFavorites })
      .eq('id', session.user.id);
    await refetch();
    setTogglingFavorite(false);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  return {
    favorites: profile?.favorites || [],
    toggleFavorite,
    togglingFavorite,
  };
};

export default useFavorites;
