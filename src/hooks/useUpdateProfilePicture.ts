import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import useUser from "./useUser";

const useUpdateProfilePicture = () => {
  // Updates the profile picture once a day. Workaround for only using auth provider and no separately stored profile picture

  const supabase = useSupabaseClient();
  const session = useSession();
  const { profile: me } = useUser(session?.user?.id || "");

  const doProfileUpdate = async () => {
    if (!session || !me) return;
    if (session.user.user_metadata.avatar_url !== me.profile_picture) {
      const { error } = await supabase
        .from("profiles")
        .update({ profile_picture: session.user.user_metadata.avatar_url })
        .eq("id", session.user.id);
    }
  };

  useEffect(() => {
    if (!session || !me) return;
    const lastUpdateTime = localStorage.getItem("_lastProfilePictureUpdate");
    if (
      !lastUpdateTime ||
      Date.now() - parseInt(lastUpdateTime) > 1000 * 60 * 60 * 24
    ) {
      doProfileUpdate();
      localStorage.setItem("_lastProfilePictureUpdate", Date.now().toString());
    } else {
      return;
    }
  }, [session, me]);
};

export default useUpdateProfilePicture;
