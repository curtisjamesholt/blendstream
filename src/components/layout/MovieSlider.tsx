import { useEffect, useMemo, useRef, useState } from 'react';
import { Movie } from '../../hooks/usePublishMovie';
import MovieCard from '../MovieCard';
import { FiChevronLeft, FiChevronRight, FiHash } from 'react-icons/fi';
import { useMoviesByCategory } from '../../hooks/useMovies';
import Link from 'next/link';

interface MovieSliderProps {
  movies?: Movie[];
  shuffled?: boolean;
  tag?: string;
  title: string;
}

const MovieSlider = (props: MovieSliderProps) => {
  const { movies, title, tag, shuffled } = props;

  const { movies: sortedMovies } = useMoviesByCategory(tag || '', 15);

  const [tagged, setTagged] = useState<Movie[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState<number>(0);

  const [hasOverflow, setHasOverflow] = useState<boolean>(false);

  const itemWidth = 600;

  const onPrev = () => {
    setOffset((prev) => Math.max(0, prev - itemWidth));
  };

  const onNext = () => {
    if (wrapperRef.current && containerRef.current) {
      const maxOffset =
        containerRef.current.scrollWidth - wrapperRef.current.clientWidth;
      setOffset((prev) => Math.min(prev + itemWidth, maxOffset));
    }
  };

  const updateHasOverflow = () => {
    if (wrapperRef.current && containerRef.current) {
      setHasOverflow(
        wrapperRef.current.clientWidth < containerRef.current.scrollWidth
      );
    } else {
      setHasOverflow(false);
    }
  };

  useEffect(() => {
    updateHasOverflow();
  }, [movies, tagged, wrapperRef.current, containerRef.current]);

  useEffect(() => {
    window.addEventListener('resize', updateHasOverflow);
    return () => {
      window.removeEventListener('resize', updateHasOverflow);
    };
  }, []);

  useEffect(() => {
    if (shuffled) {
      setTagged([...sortedMovies].sort(() => 0.5 - Math.random()));
    } else {
      setTagged([...sortedMovies]);
    }
  }, [sortedMovies, shuffled]);

  const displayMovies = movies ? movies : tag ? tagged : [];

  return (
    <div className="flex w-full flex-col overflow-x-hidden">
      {!tag ? (
        <span className="mx-2 mb-1 text-lg font-medium tracking-wide md:mx-8">
          {title}
        </span>
      ) : (
        <div className="flex flex-row items-center justify-between">
          <Link
            href={`/categories/${encodeURIComponent(tag)}`}
            className="mx-2 mb-1 flex w-min flex-row items-center gap-1 whitespace-nowrap text-lg font-medium tracking-wide transition-all hover:underline md:mx-8"
          >
            {title}
          </Link>
          {offset > 0 && (
            <Link
              href={`/categories/${encodeURIComponent(tag)}`}
              className="mr-8 hidden text-sm opacity-50 animate-in fade-in hover:underline md:block"
            >
              See all
            </Link>
          )}
        </div>
      )}
      <div ref={wrapperRef} className={`relative w-full`}>
        <div
          ref={containerRef}
          style={{ transform: `translateX(-${offset}px)` }}
          className={`mt-1.5 w-full overflow-x-auto whitespace-nowrap transition-transform md:overflow-x-visible`}
        >
          {displayMovies.map((movie) => (
            <div
              key={movie.id}
              className="mr-2 inline-block aspect-video w-52 overflow-visible first:ml-2 md:mr-5 md:w-64 md:first:ml-8 md:last:mr-8"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
          {displayMovies.length === 0 && (
            <>
              <div className="relative mr-2 inline-block aspect-video w-[200px] overflow-hidden rounded-md bg-gray-900 first:ml-2 md:mr-4 md:w-64 md:first:ml-8 md:last:mr-8">
                <div className="shimmer"></div>
              </div>
            </>
          )}
        </div>
        {hasOverflow && (
          <>
            {offset > 0 && (
              <button
                className="group absolute left-0 top-0 hidden h-full w-44 items-center justify-start rounded bg-gradient-to-r from-black to-transparent px-8 opacity-100 transition-opacity hover:opacity-100 md:flex"
                onClick={onPrev}
              >
                <FiChevronLeft
                  size={30}
                  className="opacity-75 transition-opacity group-hover:opacity-100"
                />
              </button>
            )}
            <button
              className="group absolute right-0 top-0 hidden h-full w-44 items-center justify-end rounded bg-gradient-to-l from-black to-transparent px-8 opacity-100 transition-opacity hover:opacity-100 md:flex"
              onClick={onNext}
            >
              <FiChevronRight
                size={30}
                className="opacity-75 transition-opacity group-hover:opacity-100"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieSlider;
