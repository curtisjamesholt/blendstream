import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Footer from '../../src/components/layout/Footer';
import Header from '../../src/components/layout/Header';
import MovieCard from '../../src/components/MovieCard';
import {
  getMoviesByCategory,
  useMoviesByCategory,
} from '../../src/hooks/useMovies';
import useTags, { useTagTitle } from '../../src/hooks/useTags';

export default function Categories() {
  const router = useRouter();
  const { category } = router.query;

  const tag = typeof category === 'string' ? category : '';

  const { movies } = useMoviesByCategory(tag);

  const { tags } = useTags();
  const title = useTagTitle(tag);

  return (
    <>
      <Head>
        <title>Blend.Stream | Categories</title>
        <meta property="og:image" content="/embed_image.jpg" />
      </Head>
      <div className="flex min-h-[100vh] flex-col">
        <Header />
        <div className="w-full flex-grow px-4 pt-8">
          <select
            name="categories"
            id="categories"
            value={tag}
            onChange={(e) => {
              router.push(`/categories/${encodeURIComponent(e.target.value)}`);
            }}
            className="mx-0 mb-4 bg-transparent text-2xl font-bold outline-none md:mx-4"
          >
            {tags.map((tag) => (
              <option
                key={tag.tag}
                value={tag.tag}
                className="bg-zinc-900 text-base font-medium text-white hover:bg-slate-500"
              >
                {tag.title}
              </option>
            ))}
          </select>
          <div className="mb-4 flex flex-row flex-wrap justify-center gap-5 md:mx-4 md:justify-start">
            {movies.map((movie) => (
              <div key={movie.id} className="aspect-video w-full md:w-auto">
                <MovieCard movie={movie} fullWidth />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const category = context.params?.category as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['moviesByCategory', category, ''], () =>
    getMoviesByCategory(category)
  );

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
