import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import useUser from './useUser';
import { useState } from 'react';

const useWatchlist = () => {
  const supabase = useSupabaseClient();

  const session = useSession();
  const { profile, refetch } = useUser(session?.user.id || '');

  const [togglingWatchlist, setTogglingWatchlist] = useState<boolean>(false);

  const toggleInWatchlist = async (id: string) => {
    if (!session || !profile) return;
    setTogglingWatchlist(true);
    let newWatchlist = [...(profile.watchlist || [])];
    if ((profile.watchlist || []).includes(id)) {
      newWatchlist.splice(newWatchlist.indexOf(id), 1);
    } else {
      newWatchlist.unshift(id);
    }
    const { data, error } = await supabase
      .from('profiles')
      .update({ watchlist: newWatchlist })
      .eq('id', session.user.id);
    await refetch();
    setTogglingWatchlist(false);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  return {
    watchlist: profile?.watchlist || [],
    toggleInWatchlist,
    togglingWatchlist,
  };
};

export default useWatchlist;
