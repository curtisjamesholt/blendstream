import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { Profile } from './useUser';

interface SimpleProfile {
  id: string;
  full_name: string;
}

export const useSearchedUsers = (search: string) => {
  const supabase = useSupabaseClient();

  const fetchUsers = async () => {
    if (!search) return [];
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name')
      .ilike('full_name', `%${search}%`)
      .limit(10);
    if (error) throw error;
    return data as SimpleProfile[];
  };
  const { data, error, isLoading, refetch } = useQuery<SimpleProfile[] | null>(
    ['users', search],
    fetchUsers
  );

  return { users: data || [], error, isLoading, refetch };
};
