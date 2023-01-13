import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import MovieSlider from '../src/components/layout/MovieSlider';
import MovieBanner from '../src/components/MovieBanner';
import useFavorites from '../src/hooks/useFavorites';
import {
  useFeaturedMovies,
  useMoviesById,
  useRecentMovies,
} from '../src/hooks/useMovies';
import useTags from '../src/hooks/useTags';
import useUpdateProfilePicture from '../src/hooks/useUpdateProfilePicture';
import useWatchlist from '../src/hooks/useWatchlist';

export default function Home() {
  const session = useSession();

  const { watchlist } = useWatchlist();
  const { favorites } = useFavorites();
  const { movies: watchlistMovies } = useMoviesById(watchlist);
  const { movies: favoritesMovies } = useMoviesById(favorites);
  const { recentMovies } = useRecentMovies();
  const { shuffledFeaturedMovies } = useFeaturedMovies();

  const { tags } = useTags();

  useUpdateProfilePicture();

  return (
    <>
      <Head>
        <title>Blend.Stream</title>
      </Head>
      <Header />
      <main className="flex flex-col gap-4">
        <MovieBanner movies={shuffledFeaturedMovies} />
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
          <MovieSlider movies={recentMovies} title="New Arrivals" />
          {tags.map((tag) => {
            if (tag.order !== null) {
              return (
                <MovieSlider key={tag.tag} title={tag.title} tag={tag.tag} />
              );
            }
            return null;
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
