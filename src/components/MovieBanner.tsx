import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMovieThumbnails } from '../hooks/useMovieThumbnail';
import { Movie } from '../hooks/usePublishMovie';
import { FiPlay } from 'react-icons/fi';

interface MovieBannerProps {
  movies: Movie[];
}

const MovieBanner = (props: MovieBannerProps) => {
  const { movies } = props;

  const [index, setIndex] = useState<number>(0);

  const thumbnails = useMovieThumbnails(movies.map((movie) => movie.url));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 7000);
    return () => {
      clearInterval(interval);
    };
  }, [movies]);

  if (!movies.length) return <></>;

  return (
    <div className="relative">
      <div className="relative -mt-16 flex w-full justify-center">
        <div className="flex h-[70vh] w-full items-center justify-center overflow-x-hidden md:items-start md:overflow-x-visible">
          <div className="relative aspect-video h-[50vh] md:h-auto md:max-h-[90vh] md:w-[100vw]">
            {thumbnails.map((thumbnail, i) => (
              <Image
                key={i}
                fill
                style={{ objectFit: 'cover' }}
                className={`duration-400 transition-opacity ease-in-out ${
                  i === index ? 'opacity-100' : 'opacity-0'
                }`}
                alt="Thumbnail"
                src={thumbnail.highest}
              />
            ))}
            <div
              className="absolute h-full w-full"
              style={{
                background:
                  'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 100%)',
              }}
            ></div>
          </div>
        </div>
        <div className="absolute left-4 right-4 bottom-4 flex flex-col gap-4 md:left-8 md:bottom-8">
          <span className="mb-2 text-4xl font-bold tracking-wide opacity-100 md:text-6xl">
            {movies[index].title}
          </span>
          <Link href={`/movies/${movies[index].id}`}>
            <div className="mb-4 flex h-10 w-[150px] items-center justify-center gap-2 rounded bg-white">
              <FiPlay className="fill-black stroke-black" size={16} />
              <span className="text-base font-semibold tracking-wide text-black">
                Watch
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;
