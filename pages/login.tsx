import { useSession } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../src/hooks/useAuth";

export default function Submit() {
  const session = useSession();

  const router = useRouter();

  const { signInWithDiscord } = useAuth();

  const onSignIn = async () => {
    await signInWithDiscord();
  };

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <button onClick={onSignIn}>sign in with discord</button>
    </>
  );
}
