import { useRouter } from 'next/router';
import useMovie from '../../src/hooks/useMovie';
import Link from 'next/link';
import useUser from '../../src/hooks/useUser';
import Head from 'next/head';
import useMovieThumbnail from '../../src/hooks/useMovieThumbnail';
import MovieBanner from '../../src/components/MovieBanner';
import Header from '../../src/components/layout/Header';
import Image from 'next/image';
import { FiHeart, FiPlay, FiPlus } from 'react-icons/fi';
import { useSession } from '@supabase/auth-helpers-react';
import Footer from '../../src/components/layout/Footer';

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;
  const session = useSession();

  const { movie } = useMovie(typeof id === 'string' ? id : '');
  const { highest: thumbnail } = useMovieThumbnail(movie?.url || '');
  const { profile } = useUser(movie?.creator || '');

  const onToggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const onToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  if (!movie) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <>
        <Header />
        <div className="h-[100vh]">
          <Link href={`/watch/${movie.id}`}>
            <div className="relative h-[80vh] overflow-hidden md:mx-8 md:mt-4 md:rounded-xl">
              {thumbnail && (
                <Image
                  className="aspect-video object-cover gradient-mask-b-50 md:[mask-image:none]"
                  src={thumbnail}
                  alt="Thumbnail"
                  fill
                />
              )}
              <div
                className="absolute h-full w-full"
                style={{
                  background:
                    'linear-gradient(0deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)',
                }}
              ></div>

              <div className="absolute top-1/2 left-1/2 flex aspect-square w-[70px] translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-black bg-opacity-40 transition-all hover:bg-opacity-70">
                <FiPlay className="ml-1 fill-white" size={24} />
              </div>

              <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8">
                <span className="text-5xl font-semibold">{movie.title}</span>
                <div className="mt-2 flex items-center gap-4">
                  <div className="relative aspect-square w-6 overflow-hidden rounded-full">
                    {profile?.profile_picture && (
                      <Image src={profile.profile_picture} alt="Profile" fill />
                    )}
                  </div>
                  <span className="font-medium">{profile?.full_name}</span>
                </div>
                <span className="mt-6 block max-w-xl text-sm font-normal">
                  {movie.description}
                </span>
                {session && (
                  <div className="mt-6 flex gap-2">
                    <button
                      onClick={onToggleWatchlist}
                      className="flex items-center gap-4 rounded-md bg-white bg-opacity-10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:bg-opacity-20"
                    >
                      <FiPlus strokeWidth={3} />
                      Add to Watchlist
                    </button>
                    <button
                      onClick={onToggleFavorite}
                      className="flex items-center gap-4 rounded-md bg-white bg-opacity-10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:bg-opacity-20"
                    >
                      <FiHeart strokeWidth={3} />
                      Favorite
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
        <Footer />
      </>
    </>
  );
}
