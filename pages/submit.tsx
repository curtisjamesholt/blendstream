import { useSession } from '@supabase/auth-helpers-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import usePublishMovie from '../src/hooks/usePublishMovie';
import ReactConfetti from 'react-confetti';

export default function Submit() {
  const session = useSession();

  const [animationParent] = useAutoAnimate();

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [isOwnMovie, setIsOwnMovie] = useState<boolean>(true);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [creator, setCreator] = useState<string>('');

  const { submitMovie, loading } = usePublishMovie();

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // await submitMovie(title, description, url);
    // router.push("/profile");
  };

  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <Head>
        <title>Submit</title>
      </Head>
      <div className="flex min-h-[100vh] flex-col">
        <Header />
        <div className="w-full flex-grow px-4 pt-8">
          {session && !submitted ? (
            <form
              ref={animationParent as any}
              onSubmit={onSubmitForm}
              className="flex flex-col gap-4 md:m-auto md:w-[400px]"
            >
              <span
                className="text-2xl font-bold
              "
              >
                Submit
              </span>
              <div className="flex gap-4">
                <div
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-md border-2 border-transparent bg-white bg-opacity-10 py-[20px] text-sm font-semibold tracking-wide text-white transition-all hover:bg-opacity-20 ${
                    isOwnMovie
                      ? 'border-cyan-600 bg-cyan-600 text-cyan-600'
                      : ''
                  }`}
                  onClick={() => setIsOwnMovie(true)}
                >
                  Your Movie
                </div>
                <div
                  onClick={() => setIsOwnMovie(false)}
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-md border-2 border-transparent bg-white bg-opacity-10 py-[20px] text-sm font-semibold tracking-wide text-white transition-all hover:bg-opacity-20 ${
                    !isOwnMovie
                      ? 'border-cyan-600 bg-cyan-600 text-cyan-600'
                      : ''
                  }`}
                >
                  Other Creator
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-400"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Movie Title"
                  className="rounded border-none bg-zinc-900 p-2 text-sm font-normal outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {!isOwnMovie ? (
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="creator"
                    className="text-sm font-medium text-gray-400"
                  >
                    Creator Name
                  </label>
                  <input
                    type="text"
                    name="creator"
                    id="creator"
                    placeholder="Name of the creator"
                    className="rounded border-none bg-zinc-900 p-2 text-sm font-normal outline-none"
                    value={creator}
                    onChange={(e) => setCreator(e.target.value)}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-400"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="A short description for the movie"
                  className="min-h-[100px] resize-y rounded border-none bg-zinc-900 p-2 text-sm font-normal outline-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="url"
                  className="text-sm font-medium text-gray-400"
                >
                  URL
                </label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="rounded border-none bg-zinc-900 p-2 text-sm font-normal outline-none"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={
                  loading ||
                  !title ||
                  !description ||
                  !url ||
                  (!creator && !isOwnMovie)
                }
                className="rounded-md bg-white py-2 text-sm font-medium text-black transition-all hover:bg-opacity-80 disabled:bg-opacity-50"
              >
                Submit
              </button>
            </form>
          ) : submitted ? (
            <div className="mx-4 flex flex-col items-center justify-center gap-4 md:mx-8">
              <ReactConfetti
                width={width}
                height={height}
                numberOfPieces={100}
              />
              <span className="text-4xl font-bold">Success!</span>
              <span className="text-center opacity-50">
                Your submission will be reviewed and published as soon as
                possible.
              </span>
            </div>
          ) : (
            <div className="flex flex-col">
              <span>user is required to submit, please sign in</span>
              <Link href={'/login'}>Sign In</Link>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
