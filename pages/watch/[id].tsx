import { useRouter } from 'next/router';
import useMovie, { getMovie } from '../../src/hooks/useMovie';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useMemo } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import LoadingPage from '../../src/components/LoadingPage';
import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import useMovieThumbnail from '../../src/hooks/useMovieThumbnail';

export default function Player() {
  const router = useRouter();
  const { id } = router.query;

  const [windowSize, setWindowSize] = useState<[number, number]>([0, 0]);

  const { movie } = useMovie(typeof id === 'string' ? id : '');
  const { highest } = useMovieThumbnail(movie);

  const movieId = useMemo(() => {
    try {
      const urlObj = new URL(movie?.url || '');
      if (urlObj.origin.includes('youtu.be')) {
        return urlObj.pathname.slice(1);
      }
      return urlObj.searchParams.get('v');
    } catch (e) {
      return '';
    }
  }, [movie]);

  useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);

    const handleResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{`Blend.Stream | ${movie?.title || ''}`}</title>
        <meta
          property="og:title"
          content={movie?.title || 'Blend.Stream'}
          key="title"
        />
        <meta
          property="og:image"
          content={`https://blend.stream/api/og?thumbnail=${encodeURIComponent(
            highest
          )}`}
        />
        <meta
          property="og:description"
          content={movie?.description.substring(0, 60) + '...' || ''}
        />
      </Head>
      {movie ? (
        <div className="overflow-hidden">
          <div className="pointer-events-none fixed top-0 left-0 h-full w-full"></div>
          <div
            className={`fixed top-1/2 left-4 hidden transition-transform md:block`}
          >
            <Link href={`/movies/${movie.id}`}>
              <div className="flex aspect-square w-14 items-center justify-center rounded-full bg-black bg-opacity-30 transition-all hover:bg-opacity-50">
                <FiChevronLeft size={24} />
              </div>
            </Link>
          </div>
          <iframe
            src={`https://www.youtube.com/embed/${movieId}?color=white&fs=1`}
            allowFullScreen
            width={windowSize[0]}
            height={windowSize[1]}
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

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['movie', id], () => getMovie(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    // revalidate every 24 hours
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
