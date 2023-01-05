import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import MovieSlider from '../src/components/layout/MovieSlider';
import MovieBanner from '../src/components/MovieBanner';
import useMovies from '../src/hooks/useMovies';
import useUpdateProfilePicture from '../src/hooks/useUpdateProfilePicture';

export default function Home() {
  const session = useSession();
  const { movies } = useMovies();

  useUpdateProfilePicture();

  return (
    <>
      <Head>
        <title>Shortfilms</title>
      </Head>
      <Header />
      <main className="flex flex-col gap-4">
        <MovieBanner movies={movies} />
        <div className="z-10 mb-16 flex flex-col gap-14">
          {session && (
            <>
              <MovieSlider title="Your Watchlist" movies={movies} />
              <MovieSlider title="Your Favorites" movies={movies} />
              <MovieSlider title="Recently Watched" movies={movies} />
            </>
          )}
          <MovieSlider title="Photorealism" movies={movies} />
          <MovieSlider title="NPR" movies={movies} />
          <MovieSlider title="One Person Production" movies={movies} />
          <MovieSlider title="Blender" movies={movies} />
          <MovieSlider title="Sci-Fi" movies={movies} />
          <MovieSlider title="Comedy" movies={movies} />
        </div>
      </main>
      <Footer />
    </>
  );
}
