import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import useAuth from '../src/hooks/useAuth';
import useMyMovies from '../src/hooks/useMyMovies';
import useUser from '../src/hooks/useUser';

export default function Profile() {
  const session = useSession();

  const router = useRouter();

  const { signOut } = useAuth();
  const { profile } = useUser(session?.user.id || '');

  const { movies, isLoading } = useMyMovies();

  const onSignOut = async () => {
    await signOut();
    router.push('/');
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
      <div className="flex min-h-[100vh] flex-col">
        <Header />
        <div className="mx-4 flex-grow pt-8 md:mx-8">
          {session?.user.id}
          <br />
          <br />
          {session?.user.email}
          <br />
          {profile?.full_name}
          <br />
          {session?.user.user_metadata.name}
          <br />
          moderator: {JSON.stringify(profile?.is_moderator)}
          <br />
          <br />
          <button onClick={onSignOut}>sign out</button>
          {movies.map((movie) => (
            <div key={movie.id}>
              {movie.title}: {JSON.stringify(movie.published)}
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}
