import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import useUser from '../src/hooks/useUser';
import { useState } from 'react';
import CurateSubmissions from '../src/components/curate/CurateSubmissions';
import CurateTags from '../src/components/curate/CurateTags';
import CurateMovies from '../src/components/curate/CurateMovies';
import CurateTab from '../src/components/curate/CurateTab';
import { useSearchParam } from 'react-use';

export default function Curate() {
  const session = useSession();
  const { profile } = useUser(session?.user.id || '');

  const tab = useSearchParam('tab');

  if (!session || !profile || (profile && !profile.is_moderator)) {
    return (
      <div>
        <Link href="/login">Sign In</Link>
      </div>
    );
  }

  const activeTab = (
    ['submissions', 'movies', 'tags'].includes(tab || '') ? tab : 'submissions'
  ) as 'submissions' | 'movies' | 'tags';

  const setActiveTab = (tab: 'submissions' | 'movies' | 'tags') => {
    window.history.pushState({}, '', `?tab=${tab}`);
  };

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
