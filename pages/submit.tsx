import { useSession } from '@supabase/auth-helpers-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import usePublishMovie from '../src/hooks/usePublishMovie';
import ReactConfetti from 'react-confetti';
import { FiInfo } from 'react-icons/fi';
import useTags from '../src/hooks/useTags';
import TagInput from '../src/components/inputs/TagInput';

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
  const [tags, setTags] = useState<string[]>([]);

  const { submitMovie, submitting } = usePublishMovie();

  const { tags: allTags } = useTags();

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    await submitMovie(title, description, url, isOwnMovie ? '' : creator, tags);
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
              <div className="flex flex-row items-start justify-start gap-2 rounded-md border-2 border-zinc-800 bg-zinc-900 bg-opacity-25 p-4">
                <FiInfo size={32} className={'h-5'} />
                <span className="text-sm tracking-wide text-zinc-300">
                  Submit your own or another creators movie below. We will
                  review your submission and add it to the site as soon as
                  possible.
                </span>
              </div>
              <div className="flex gap-4">
                <div
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-md bg-white bg-opacity-5 py-[28px] text-sm font-semibold tracking-wide transition-all hover:bg-opacity-10 ${
                    isOwnMovie
                      ? 'bg-gradient-to-br from-brand-600 to-brand-300 text-black'
                      : ''
                  }`}
                  onClick={() => setIsOwnMovie(true)}
                >
                  Your Movie
                </div>
                <div
                  onClick={() => setIsOwnMovie(false)}
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-md bg-white bg-opacity-5 py-[28px] text-sm font-semibold tracking-wide transition-all hover:bg-opacity-10 ${
                    !isOwnMovie
                      ? 'bg-gradient-to-br from-brand-600 to-brand-300 text-black'
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
                  className="rounded border-none bg-zinc-900 p-2 px-3 text-sm font-normal outline-none"
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
                  placeholder="A short description of the movie"
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
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="tags"
                  className="text-sm font-medium text-gray-400"
                >
                  Tags
                </label>
                <TagInput
                  id="tags"
                  options={allTags.map((t) => t.tag)}
                  setTags={setTags}
                  tags={tags}
                />
              </div>
              <button
                type="submit"
                disabled={
                  submitting ||
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
            <div className="mx-4 mt-[30vh] flex flex-col items-center justify-center gap-4 md:mx-8">
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
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="mt-4 flex items-center justify-center rounded-md bg-white bg-opacity-10 py-2 px-8 text-sm tracking-wide transition-all hover:bg-opacity-20"
              >
                Submit Another
              </button>
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
