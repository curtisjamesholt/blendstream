import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Link from 'next/link';
import TagItem from '../src/components/inputs/TagItem';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import SubmissionCard from '../src/components/submissions/SubmissionCard';
import useSubmissions from '../src/hooks/useSubmissions';
import useTags from '../src/hooks/useTags';
import useUser from '../src/hooks/useUser';
import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

export default function Curate() {
  const session = useSession();
  const { profile } = useUser(session?.user.id || '');

  const [activeTab, setActiveTab] = useState<'submissions' | 'tags' | 'movies'>(
    'submissions'
  );

  const { movies: submissions } = useSubmissions();

  const { tags, addTag } = useTags();

  const [newTag, setNewTag] = useState<string>('');
  const [newTagTitle, setNewTagTitle] = useState<string>('');

  const onAddNewTag = () => {
    if (newTag && newTagTitle) {
      addTag(newTag, newTagTitle);
      setNewTag('');
      setNewTagTitle('');
    }
  };

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
            <div
              onClick={() => setActiveTab('submissions')}
              className={`flex cursor-pointer items-center justify-center rounded-full px-6 py-2 text-sm font-medium tracking-wide transition-all ${
                activeTab === 'submissions' ? 'bg-white text-black' : ''
              }`}
            >
              Submissions
            </div>
            <div
              onClick={() => setActiveTab('movies')}
              className={`flex cursor-pointer items-center justify-center rounded-full px-6 py-2 text-sm font-medium tracking-wide transition-all ${
                activeTab === 'movies' ? 'bg-white text-black' : ''
              }`}
            >
              Movies
            </div>
            <div
              onClick={() => setActiveTab('tags')}
              className={`flex cursor-pointer items-center justify-center rounded-full px-6 py-2 text-sm font-medium tracking-wide transition-all ${
                activeTab === 'tags' ? 'bg-white text-black' : ''
              }`}
            >
              Tags
            </div>
          </div>
          <div hidden={activeTab !== 'submissions'}>
            {submissions.length === 0 && (
              <span className="text-sm opacity-60">
                No unpublished movies submitted
              </span>
            )}
            <div className="flex flex-row flex-wrap gap-4">
              {submissions.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </div>
          </div>
          <div hidden={activeTab !== 'tags'}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {tags.map((tag) => (
                  <TagItem key={tag.tag} tag={tag} />
                ))}
              </div>
              <div className="flex w-full flex-col gap-2 rounded-md md:w-min md:flex-row">
                <input
                  type="text"
                  placeholder="tag"
                  value={newTag}
                  onChange={(e) => {
                    setNewTag(e.target.value);
                  }}
                  className="rounded border-none bg-zinc-900 px-4 py-2 text-sm outline-none"
                />
                <input
                  type="text"
                  placeholder="Tag Title"
                  value={newTagTitle}
                  onChange={(e) => {
                    setNewTagTitle(e.target.value);
                  }}
                  className="rounded border-none bg-zinc-900 px-4 py-2 text-sm outline-none"
                />
                <button
                  onClick={onAddNewTag}
                  disabled={!newTag || !newTagTitle}
                  className="rounded bg-white py-1 px-6 text-sm font-semibold text-black transition-all hover:bg-opacity-90 disabled:opacity-50 md:py-0"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div hidden={activeTab !== 'movies'}>placeholder</div>
        </div>
        <Footer />
      </div>
    </>
  );
}
