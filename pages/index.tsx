import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import MovieSlider from '../src/components/layout/MovieSlider';
import MovieBanner from '../src/components/MovieBanner';
import useFavorites from '../src/hooks/useFavorites';
import {
  useFeaturedMovies,
  useMoviesByCategory,
  useMoviesById,
  useRecentMovies,
} from '../src/hooks/useMovies';
import useUpdateProfilePicture from '../src/hooks/useUpdateProfilePicture';
import useWatchlist from '../src/hooks/useWatchlist';

export default function Home() {
  const session = useSession();

  const { watchlist } = useWatchlist();
  const { favorites } = useFavorites();
  const { movies: watchlistMovies } = useMoviesById(watchlist);
  const { movies: favoritesMovies } = useMoviesById(favorites);
  const { recentMovies } = useRecentMovies();
  const { featuredMovies } = useFeaturedMovies();

  const { movies: photorealMovies } = useMoviesByCategory('photorealism');
  const { movies: blenderMovies } = useMoviesByCategory('blender');
  const { movies: comedyMovies } = useMoviesByCategory('comedy');

  useUpdateProfilePicture();

  return (
    <>
      <Head>
        <title>Shortfilms</title>
      </Head>
      <Header />
      <main className="flex flex-col gap-4">
        <MovieBanner movies={featuredMovies} />
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
          <MovieSlider title="Comedy" movies={comedyMovies} />
          <MovieSlider title="Made with Blender" movies={blenderMovies} />
          <MovieSlider title="Photorealism" movies={photorealMovies} />
        </div>
      </main>
      <Footer />
    </>
  );
}
