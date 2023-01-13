import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaDiscord } from 'react-icons/fa';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import useAuth from '../src/hooks/useAuth';

export default function Submit() {
  const session = useSession();

  const router = useRouter();

  const { signInWithDiscord } = useAuth();

  const onSignIn = async () => {
    await signInWithDiscord();
  };

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex min-h-[100vh] flex-col">
        <Header />
        <div className="flex flex-grow flex-col items-center gap-16">
          <button
            onClick={onSignIn}
            className="mt-[30vh] flex items-center gap-4 rounded bg-[#5865F2] px-10 py-[14px] text-sm font-medium tracking-wide text-white transition-all hover:brightness-110"
          >
            <FaDiscord size={18} /> Sign In With Discord
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}
