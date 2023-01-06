import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import usePublishMovie from '../src/hooks/usePublishMovie';

export default function Submit() {
  const session = useSession();

  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const { submitMovie, loading } = usePublishMovie();

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    await submitMovie(title, description, url);
    // router.push("/profile");
  };

  return (
    <>
      <Head>
        <title>Submit</title>
      </Head>
      {session ? (
        <div>
          <form
            onSubmit={onSubmitForm}
            style={{ display: 'flex', flexDirection: 'column', width: 200 }}
          >
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="url">URL</label>
            <input
              type="url"
              name="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit" disabled={loading || true}>
              Submit
            </button>
            <span>dont submit links to a video in a playlist</span>
          </form>
        </div>
      ) : (
        <div>
          <p>user is required to submit, please sign in</p>
          <Link href={'/login'}>Sign In</Link>
        </div>
      )}
    </>
  );
}
