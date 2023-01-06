import { useRouter } from 'next/router';
import useMovie from '../../src/hooks/useMovie';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useRef } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import LoadingPage from '../../src/components/LoadingPage';

export default function Player() {
  const router = useRouter();
  const { id } = router.query;

  const [showBack, setShowBack] = useState<boolean>(true);

  const { movie } = useMovie(typeof id === 'string' ? id : '');

  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<ReactPlayer | null>(null);

  const onMouseMove = () => {
    setShowBack(true);
    if (moveTimeoutRef.current) {
      clearTimeout(moveTimeoutRef.current);
    }
    moveTimeoutRef.current = setTimeout(() => {
      setShowBack(false);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>{movie?.title || ''}</title>
      </Head>
      {movie ? (
        <div className="overflow-hidden">
          <div className="pointer-events-none fixed top-0 left-0 h-full w-full"></div>
          <div
            className={`fixed top-1/2 left-4 hidden transition-transform md:block ${
              showBack ? 'translate-x-[0px]' : 'translate-x-[-100px]'
            }`}
          >
            <Link href={`/movies/${movie.id}`}>
              <div className="flex aspect-square w-[60px] items-center justify-center rounded-full bg-black bg-opacity-30 transition-all hover:bg-opacity-50">
                <FiChevronLeft size={24} />
              </div>
            </Link>
          </div>
          <ReactPlayer
            ref={playerRef}
            url={movie.url}
            playing={true}
            width={'100vw'}
            height={'100vh'}
            controls
          />
        </div>
      ) : (
        <div className="flex h-[100vh] w-[100vw]">
          <LoadingPage />
        </div>
      )}
    </>
  );
}
