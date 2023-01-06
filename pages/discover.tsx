import Head from 'next/head';
import Link from 'next/link';
import MovieSlider from '../src/components/layout/MovieSlider';
import { useRecentMovies } from '../src/hooks/useMovies';

export default function Discover() {
  const { recentMovies } = useRecentMovies();

  return (
    <>
      <Head>
        <title>Submit</title>
      </Head>
      <div>
        <input placeholder="Search..." autoFocus />
        <div className="mb-16 flex flex-col gap-16">
          <MovieSlider title="Photorealism" movies={recentMovies} />
          <MovieSlider title="NPR" movies={recentMovies} />
          <MovieSlider title="One Person Production" movies={recentMovies} />
          <MovieSlider title="Blender" movies={recentMovies} />
          <MovieSlider title="Sci-Fi" movies={recentMovies} />
          <MovieSlider title="Comedy" movies={recentMovies} />
        </div>
      </div>
    </>
  );
}
