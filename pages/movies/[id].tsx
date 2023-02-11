import { useRouter } from 'next/router';
import useMovie, { getMovie } from '../../src/hooks/useMovie';
import Link from 'next/link';
import useUser, { getUser } from '../../src/hooks/useUser';
import Head from 'next/head';
import useMovieThumbnail from '../../src/hooks/useMovieThumbnail';
import Header from '../../src/components/layout/Header';
import Image from 'next/image';
import { FiCheck, FiHeart, FiPlay, FiPlus } from 'react-icons/fi';
import { useSession } from '@supabase/auth-helpers-react';
import Footer from '../../src/components/layout/Footer';
import useWatchlist from '../../src/hooks/useWatchlist';
import Spinner from '../../src/components/Spinner';
import useFavorites from '../../src/hooks/useFavorites';
import LoadingPage from '../../src/components/LoadingPage';
import { FaYoutube } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { Movie } from '../../src/hooks/usePublishMovie';

export default function MoviePage() {
  const router = useRouter();
  const { id } = router.query;
  const session = useSession();

  const { movie } = useMovie(typeof id === 'string' ? id : '');
  const { highest, mid } = useMovieThumbnail(movie);
  const [thumbnail, setThumbnail] = useState<string>('');
  const { profile } = useUser(movie?.creator || '');
  const { watchlist, toggleInWatchlist, togglingWatchlist } = useWatchlist();
  const { favorites, toggleFavorite, togglingFavorite } = useFavorites();

  const onToggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (movie) {
      toggleInWatchlist(movie.id);
    }
  };

  const onToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (movie) {
      toggleFavorite(movie.id);
    }
  };

  const onImageError = () => {
    setThumbnail(mid);
  };

  useEffect(() => {
    if (highest && !thumbnail) {
      setThumbnail(highest);
    }
  }, [highest, thumbnail]);

  return (
    <>
      <Head>
        <title>{`Blend.Stream | ${movie?.title || ''}`}</title>
        <meta
          property="og:title"
          content={movie?.title || 'Blend.Stream'}
          key="title"
        />
        <meta property="og:image" content={'https://blend.stream/api/og'} />
      </Head>
      <>
        <div className="flex min-h-[100vh] flex-col">
          <Header />
          {movie ? (
            <div className="flex-grow">
              <div className="relative h-[90vh] min-h-[600px] w-full overflow-hidden md:h-[80vh]">
                <Link
                  href={`/watch/${movie.id}`}
                  className="fixed top-0 left-0 h-[90vh] w-full overflow-hidden"
                >
                  {thumbnail && (
                    <Image
                      className="h-full w-full object-cover"
                      src={thumbnail}
                      alt="Thumbnail"
                      width={1920}
                      height={1080}
                      onError={onImageError}
                    />
                  )}
                  <div
                    className="absolute top-0 left-0 h-full w-full"
                    style={{
                      background:
                        'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%)',
                    }}
                  ></div>
                  <div className="absolute top-1/2 left-1/2 flex aspect-square w-[70px] translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-black bg-opacity-40 transition-all hover:bg-opacity-70">
                    <FiPlay className="ml-1 fill-white" size={24} />
                  </div>
                </Link>

                <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8">
                  <span className="text-4xl font-semibold md:text-5xl">
                    {movie.title}
                  </span>
                  <Link
                    className="mt-4 flex w-min items-center gap-4"
                    href={`/users/${profile?.id || ''}`}
                  >
                    <div className="relative aspect-square w-6 overflow-hidden rounded-full">
                      {profile?.profile_picture && (
                        <Image
                          src={profile.profile_picture}
                          alt="Profile"
                          height={50}
                          width={50}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <span className="whitespace-nowrap text-sm font-medium md:text-base">
                      {profile?.full_name}
                    </span>
                  </Link>
                  <div className="mt-6 flex gap-1">
                    {[...movie.tags].sort().map((category) => (
                      <span
                        key={category}
                        className="rounded bg-white bg-opacity-10 px-2 py-[2px] text-xs font-medium tracking-wide"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <span className="mt-2 block max-w-xl text-sm font-normal">
                    {movie.description}
                  </span>
                  <div className="mt-6 flex flex-col gap-4">
                    {session && (
                      <div className="flex gap-2">
                        <button
                          onClick={onToggleWatchlist}
                          disabled={togglingWatchlist}
                          className={`flex items-center gap-4 rounded-md bg-white px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all ${
                            watchlist.includes(movie?.id || '')
                              ? 'bg-opacity-100 text-black'
                              : 'bg-opacity-10 hover:bg-opacity-20'
                          }`}
                        >
                          {togglingWatchlist ? (
                            <Spinner size={16} />
                          ) : watchlist.includes(movie?.id || '') ? (
                            <FiCheck />
                          ) : (
                            <FiPlus strokeWidth={3} />
                          )}
                          {watchlist.includes(movie.id)
                            ? 'Watchlist'
                            : 'Add to Watchlist'}
                        </button>
                        <button
                          onClick={onToggleFavorite}
                          disabled={togglingFavorite}
                          className={`flex items-center gap-4 rounded-md bg-white px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all ${
                            favorites.includes(movie?.id || '')
                              ? 'bg-opacity-100 text-black'
                              : 'bg-opacity-10 hover:bg-opacity-20'
                          }`}
                        >
                          {favorites.includes(movie.id) ? (
                            togglingFavorite ? (
                              <Spinner size={16} />
                            ) : (
                              <FiHeart className="fill-red-500 stroke-red-500 stroke-2" />
                            )
                          ) : (
                            <>
                              {togglingFavorite ? (
                                <Spinner size={16} />
                              ) : (
                                <FiHeart strokeWidth={3} />
                              )}
                              Favorite
                            </>
                          )}
                        </button>
                      </div>
                    )}
                    <Link
                      href={movie.url}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      className="flex w-min items-center gap-4 rounded-md bg-white bg-opacity-10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:bg-opacity-20"
                    >
                      <FaYoutube size={18} />
                      <span className="whitespace-nowrap">
                        Support {profile?.full_name || ''}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <LoadingPage />
          )}
          <Footer />
        </div>
      </>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['movie', id], () => getMovie(id));
  const movie = queryClient.getQueryData(['movie', id]) as Movie | null;
  await queryClient.prefetchQuery(['profile', movie?.creator || ''], () =>
    getUser(movie?.creator || '')
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
