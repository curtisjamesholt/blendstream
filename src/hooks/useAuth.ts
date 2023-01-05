import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useAuth = () => {
  const supabase = useSupabaseClient();

  const signInWithDiscord = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return error;
  };

  return { signInWithDiscord, signOut };
};

export default useAuth;
