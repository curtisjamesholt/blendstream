import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';
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
        <title>Blend.Stream | Login</title>
      </Head>
      <div className="flex min-h-[100vh] flex-col">
        <Header />
        <div className="mt-40 flex flex-grow flex-col items-center gap-8">
          <button
            onClick={onSignIn}
            className="flex items-center gap-4 rounded bg-[#5865F2] px-10 py-[14px] text-sm font-medium tracking-wide text-white transition-all hover:brightness-110"
          >
            <FaDiscord size={18} /> Sign In With Discord
          </button>
          <div className="flex flex-row items-center justify-center gap-2 opacity-50">
            <FiInfo size={24} className={'h-4'} />
            <span className="text-sm tracking-wide">
              We use cookies to keep you logged in
            </span>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
