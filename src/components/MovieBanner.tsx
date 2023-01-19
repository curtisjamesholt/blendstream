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

  const thumbnails = useMovieThumbnails(movies);

  const showDuration = 10000;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, showDuration);
    return () => {
      clearInterval(interval);
    };
  }, [movies]);

  return (
    <div className="relative">
      <div className="relative -mt-16 flex w-full justify-center">
        <div className="flex h-[90vh] w-full items-start justify-center overflow-x-hidden md:h-[70vh] md:items-start md:overflow-x-visible">
          <div className="relative aspect-video h-[100%] overflow-hidden md:h-auto md:max-h-[90vh] md:w-[100vw]">
            {thumbnails.map((thumbnail, i) => (
              <Image
                key={i}
                width={1920}
                height={1080}
                priority
                style={{
                  animation: `scaleAnim ${showDuration}ms linear infinite, fadeAnim ${showDuration}ms linear infinite`,
                }}
                className={`duration-400 w-full ${
                  i === index ? 'block' : 'hidden'
                }`}
                alt="Thumbnail"
                src={thumbnail.highest}
              />
            ))}
            <div
              className="absolute top-0 left-0 h-full w-full"
              style={{
                background:
                  'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 100%)',
              }}
            ></div>
            {thumbnails.length === 0 && (
              <div className="h-full w-full bg-gray-900"></div>
            )}
          </div>
        </div>
        <div className="absolute left-4 right-4 bottom-4 flex flex-col gap-4 md:left-8 md:bottom-8">
          <span className="tracking-wid text-4xl font-bold opacity-100 md:text-5xl">
            {movies.length ? movies[index].title : ''}
          </span>
          <span className="mb-4 max-w-xl text-ellipsis text-base opacity-75 line-clamp-2">
            {movies.length ? movies[index].description : ''}
          </span>
          {movies.length > 0 && (
            <Link href={`/movies/${movies[index].id}`}>
              <div className="mb-4 flex h-10 w-[150px] items-center justify-center gap-2 rounded bg-white">
                <FiPlay className="fill-black stroke-black" size={16} />
                <span className="text-base font-semibold tracking-wide text-black">
                  Watch
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;
