import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import useUser from '../src/hooks/useUser';
import { useState, useEffect } from 'react';
import CurateSubmissions from '../src/components/curate/CurateSubmissions';
import CurateTags from '../src/components/curate/CurateTags';
import CurateMovies from '../src/components/curate/CurateMovies';
import CurateTab from '../src/components/curate/CurateTab';

export default function Curate() {
  const session = useSession();
  const { profile } = useUser(session?.user.id || '');

  const [activeTab, setActiveTab] = useState<'submissions' | 'movies' | 'tags'>(
    'submissions'
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const tab = url.searchParams.get('tab');
    if (['submissions', 'movies', 'tags'].includes(tab || '')) {
      setActiveTab(tab as 'submissions' | 'movies' | 'tags');
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', activeTab);
    window.history.replaceState({}, '', url.toString());
  }, [activeTab]);

  if (!session || !profile || (profile && !profile.is_moderator)) {
    return (
      <div>
        <Link href="/login">Sign In</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Curate</title>
      </Head>
      <div className="flex min-h-[100vh] flex-col">
        <Header />
        <div className="mx-4 w-full max-w-[1200px] flex-grow pt-8 md:mx-auto md:px-8">
          <div className="mb-8 flex flex-row gap-2">
            <CurateTab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tab="submissions"
              title="Submissions"
            />
            <CurateTab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tab="movies"
              title="Movies"
            />
            <CurateTab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tab="tags"
              title="Tags"
            />
          </div>
          <div hidden={activeTab !== 'submissions'}>
            <CurateSubmissions />
          </div>
          <div hidden={activeTab !== 'tags'}>
            <CurateTags />
          </div>
          <div hidden={activeTab !== 'movies'}>
            <CurateMovies />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
