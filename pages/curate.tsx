import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import useUser from '../src/hooks/useUser';
import { useState, useEffect, useRef } from 'react';
import CurateSubmissions from '../src/components/curate/CurateSubmissions';
import CurateTags from '../src/components/curate/CurateTags';
import CurateMovies from '../src/components/curate/CurateMovies';
import CurateTab from '../src/components/curate/CurateTab';
import CurateFeatured from '../src/components/curate/CurateFeatured';
import { useRouter } from 'next/router';

export default function Curate() {
  const session = useSession();
  const { profile } = useUser(session?.user.id || '');

  const { query } = useRouter();

  const initializedTab = useRef<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    'submissions' | 'featured' | 'edit' | 'tags'
  >('submissions');

  const onTabSwitch = (tab: 'submissions' | 'featured' | 'edit' | 'tags') => {
    setActiveTab(tab);
    window.history.replaceState({}, '', `?tab=${tab}`);
  };

  useEffect(() => {
    if (query.tab && !initializedTab.current) {
      setActiveTab(query.tab as 'submissions' | 'featured' | 'edit' | 'tags');
      initializedTab.current = true;
    }
  }, [query]);

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
        <title>Blend.Stream | Curate</title>
        <meta property="og:image" content="/embed_image.jpg" />
      </Head>
      <div className="flex min-h-[100vh] flex-col">
        <Header />
        <div className="w-full max-w-[1200px] flex-grow px-4 pt-8 md:mx-auto md:px-8">
          <div className="mb-8 flex w-full flex-row gap-2 overflow-auto">
            <CurateTab
              activeTab={activeTab}
              setActiveTab={onTabSwitch}
              tab="submissions"
              title="Submissions"
            />
            <CurateTab
              activeTab={activeTab}
              setActiveTab={onTabSwitch}
              tab="featured"
              title="Featured Movies"
            />
            <CurateTab
              activeTab={activeTab}
              setActiveTab={onTabSwitch}
              tab="edit"
              title="Edit Movies"
            />
            <CurateTab
              activeTab={activeTab}
              setActiveTab={onTabSwitch}
              tab="tags"
              title="Edit Tags"
            />
          </div>
          {activeTab === 'submissions' && <CurateSubmissions />}
          {activeTab === 'featured' && <CurateFeatured />}
          {activeTab === 'edit' && <CurateMovies />}
          {activeTab === 'tags' && <CurateTags />}
        </div>
        <Footer />
      </div>
    </>
  );
}
