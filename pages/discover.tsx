import Head from 'next/head';
import Link from 'next/link';
import MovieSlider from '../src/components/layout/MovieSlider';
import useMovies from '../src/hooks/useMovies';

export default function Discover() {
  const { movies } = useMovies();

  return (
    <>
      <Head>
        <title>Submit</title>
      </Head>
      <div>
        <input placeholder="Search..." autoFocus />
        <div className="mb-16 flex flex-col gap-16">
          <MovieSlider title="Photorealism" movies={movies} />
          <MovieSlider title="NPR" movies={movies} />
          <MovieSlider title="One Person Production" movies={movies} />
          <MovieSlider title="Blender" movies={movies} />
          <MovieSlider title="Sci-Fi" movies={movies} />
          <MovieSlider title="Comedy" movies={movies} />
        </div>
      </div>
    </>
  );
}
