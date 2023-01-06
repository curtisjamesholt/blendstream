import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import MovieSlider from '../src/components/layout/MovieSlider';
import MovieBanner from '../src/components/MovieBanner';
import useFavorites from '../src/hooks/useFavorites';
import useMovies from '../src/hooks/useMovies';
import useUpdateProfilePicture from '../src/hooks/useUpdateProfilePicture';
import useWatchlist from '../src/hooks/useWatchlist';

export default function Home() {
  const session = useSession();

  const { watchlist } = useWatchlist();
  const { favorites } = useFavorites();
  const { movies: watchlistMovies } = useMovies(watchlist);
  const { movies: favoritesMovies } = useMovies(favorites);
  const { recentMovies } = useMovies();

  useUpdateProfilePicture();

  return (
    <>
      <Head>
        <title>Shortfilms</title>
      </Head>
      <Header />
      <main className="flex flex-col gap-4">
        <MovieBanner movies={recentMovies} />
        <div className="z-10 mb-16 flex flex-col gap-14">
          {session && (
            <>
              {watchlistMovies.length ? (
                <MovieSlider title="Your Watchlist" movies={watchlistMovies} />
              ) : null}
              {favoritesMovies.length ? (
                <MovieSlider title="Your Favorites" movies={favoritesMovies} />
              ) : null}
            </>
          )}
          <MovieSlider title="New Arrivals" movies={recentMovies} />
          <MovieSlider title="Photorealism" movies={watchlistMovies} />
          <MovieSlider title="NPR" movies={watchlistMovies} />
          <MovieSlider title="One Person Production" movies={watchlistMovies} />
          <MovieSlider title="Blender" movies={watchlistMovies} />
          <MovieSlider title="Sci-Fi" movies={watchlistMovies} />
          <MovieSlider title="Comedy" movies={watchlistMovies} />
        </div>
      </main>
      <Footer />
    </>
  );
}
