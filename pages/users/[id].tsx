import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaGlobe, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Footer from '../../src/components/layout/Footer';
import Header from '../../src/components/layout/Header';
import MovieSlider from '../../src/components/layout/MovieSlider';
import { useMoviesByCreator } from '../../src/hooks/useMovies';
import useUser from '../../src/hooks/useUser';

const socialLink =
  'flex flex-row items-center gap-2 w-min opacity-60 hover:opacity-100 transition-opacity';

export default function User() {
  const router = useRouter();
  const { id } = router.query;

  const { profile } = useUser(typeof id === 'string' ? id : '');
  const { movies } = useMoviesByCreator(typeof id === 'string' ? id : '');

  const isValidUrl = (url: string, origin?: string) => {
    try {
      new URL(url);
    } catch (_) {
      return false;
    }
    const urlItem = new URL(url);
    return origin
      ? urlItem.host === origin || urlItem.host === `www.${origin}`
      : true;
  };

  return (
    <>
      <Head>
        <title>Blend.Stream | {profile?.full_name || ''}</title>
      </Head>
      <div className="flex min-h-[100vh] flex-col">
        <Header />
        <div className="fixed top-0 left-0 h-[500px] w-full overflow-hidden opacity-70">
          {profile?.profile_picture && (
            <Image
              src={profile.profile_picture}
              alt="Profile Picture"
              className="w-full scale-110 object-cover blur-xl"
              height={250}
              width={250}
            />
          )}
          <div
            className="absolute top-0 left-0 h-full w-full"
            style={{
              background:
                'linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.5) 100%)',
            }}
          ></div>
        </div>
        <div className="z-10 mx-4 mt-8 flex-grow pt-8 md:mx-8">
          <div className="mx-8 flex flex-col gap-4">
            <div className="relative aspect-square w-[100px] overflow-hidden rounded-full">
              {profile?.profile_picture && (
                <Image
                  src={profile.profile_picture}
                  width={250}
                  height={250}
                  className="h-full w-full object-cover"
                  alt="Profile Picture"
                />
              )}
            </div>
            <span className="text-2xl font-semibold">
              {profile?.full_name || ''}
            </span>
            {profile?.bio && (
              <span className="max-w-md text-sm font-normal">
                {profile?.bio || ''}
              </span>
            )}
            <div className="mb-12 flex gap-4">
              {profile?.website && isValidUrl(profile.website) && (
                <Link
                  href={profile.website}
                  className={socialLink}
                  target="_blank"
                >
                  <FaGlobe />
                  Website
                </Link>
              )}
              {profile?.twitter &&
                isValidUrl(profile.twitter, 'twitter.com') && (
                  <Link
                    href={profile.twitter}
                    className={socialLink}
                    target="_blank"
                  >
                    <FaTwitter />
                    Twitter
                  </Link>
                )}
              {profile?.instagram &&
                isValidUrl(profile.instagram, 'instagram.com') && (
                  <Link
                    href={profile.instagram}
                    className={socialLink}
                    target="_blank"
                  >
                    <FaInstagram />
                    Instagram
                  </Link>
                )}
              {profile?.youtube &&
                isValidUrl(profile.youtube, 'youtube.com') && (
                  <Link
                    href={profile.youtube}
                    className={socialLink}
                    target="_blank"
                  >
                    <FaYoutube />
                    YouTube
                  </Link>
                )}
            </div>
          </div>
          {movies.length > 0 && <MovieSlider title="Movies" movies={movies} />}
        </div>
        <Footer />
      </div>
    </>
  );
}
