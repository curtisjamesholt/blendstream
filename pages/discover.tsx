import Head from 'next/head';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import MovieSlider from '../src/components/layout/MovieSlider';
import { useRecentMovies, useFilteredMovies } from '../src/hooks/useMovies';
import { useState } from 'react';
import Spinner from '../src/components/Spinner';

export default function Discover() {
  const [search, setSearch] = useState<string>('');

  const { recentMovies } = useRecentMovies();
  const { movies, loading } = useFilteredMovies(search);

  return (
    <>
      <Head>
        <title>Blend.Stream | Discover</title>
      </Head>
      <>
        <div className="flex min-h-[100vh] flex-col">
          <Header />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            autoFocus
            className="my-8 mx-4 max-w-[400px] rounded-md border-none bg-zinc-900 px-4 py-2 text-sm font-normal tracking-wide outline-none md:mx-8"
          />
          <div className="mb-16 flex flex-grow flex-col gap-16">
            {movies.length === 0 && search ? (
              loading ? (
                <Spinner size={20} className="ml-4 md:ml-8" />
              ) : (
                <span className="ml-4 text-sm opacity-70 md:ml-8">
                  No results found
                </span>
              )
            ) : (
              <MovieSlider
                title="Results"
                movies={movies.length ? movies : recentMovies}
              />
            )}
          </div>
          <Footer />
        </div>
      </>
    </>
  );
}
