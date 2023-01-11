import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import SubmissionCard from '../src/components/submissions/SubmissionCard';
import useSubmissions from '../src/hooks/useSubmissions';
import useUser from '../src/hooks/useUser';

export default function Submissions() {
  const session = useSession();
  const { profile } = useUser(session?.user.id || '');

  const { movies: submissions } = useSubmissions();

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
        <title>Profile</title>
      </Head>
      <div className="flex min-h-[100vh] flex-col">
        <Header />
        <div className="mx-4 flex-grow pt-8 md:mx-8">
          <span className="mb-4 block text-lg font-medium">Submissions</span>
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
        <Footer />
      </div>
    </>
  );
}
