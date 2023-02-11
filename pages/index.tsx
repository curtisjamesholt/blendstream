import { useSession } from '@supabase/auth-helpers-react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import MovieSlider from '../src/components/layout/MovieSlider';
import MovieBanner from '../src/components/MovieBanner';
import useFavorites from '../src/hooks/useFavorites';
import {
  getFeaturedMovies,
  getMoviesByCategory,
  getRecentMovies,
  useFeaturedMovies,
  useMoviesById,
  useRecentMovies,
} from '../src/hooks/useMovies';
import useTags, { getTags, Tag } from '../src/hooks/useTags';
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

  const { tags } = useTags();

  useUpdateProfilePicture();

  return (
    <>
      <Head>
        <title>Blend.Stream</title>
        <meta property="og:image" content="/embed_image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={'Blend.Stream'} />
        <meta name="twitter:image" content="/embed_image.jpg" />
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
          <MovieSlider movies={recentMovies} title="New Arrivals" />
          {tags.map((tag) => {
            if (tag.order !== null) {
              return (
                <MovieSlider
                  key={tag.tag}
                  title={tag.title}
                  tag={tag.tag}
                  shuffled
                />
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

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery(['tags'], () => getTags());
    const tags = queryClient.getQueryData(['tags']) as Tag[] | null;

    for (let tag of tags || []) {
      if (tag.order !== null) {
        await queryClient.prefetchQuery(['moviesByCategory', tag.tag, 15], () =>
          getMoviesByCategory(tag.tag, 15)
        );
      }
    }

    await queryClient.prefetchQuery(['featuredMovies'], () =>
      getFeaturedMovies()
    );

    await queryClient.prefetchQuery(['recentMovies'], () => getRecentMovies());

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      // revalidate every hour
      revalidate: 60 * 60,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};
