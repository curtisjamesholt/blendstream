import { useSession } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuth from "../src/hooks/useAuth";
import useMyMovies from "../src/hooks/useMyMovies";

export default function Profile() {
  const session = useSession();

  const router = useRouter();

  const { signOut } = useAuth();

  const { movies, isLoading } = useMyMovies();

  const onSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (!session) {
    return (
      <div>
        <Link href="/login">Sign In</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div>
        {session?.user.id}
        <button onClick={onSignOut}>sign out</button>
        {movies.map((movie) => (
          <div>
            {movie.title}: {JSON.stringify(movie.published)}
          </div>
        ))}
      </div>
    </>
  );
}
