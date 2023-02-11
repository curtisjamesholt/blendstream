import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useMovieThumbnail from '../hooks/useMovieThumbnail';
import { Movie } from '../hooks/usePublishMovie';
import { useSimpleUser } from '../hooks/useUser';

interface MovieCardProps {
  movie: Movie;
  fullWidth?: boolean;
}

const MovieCard = (props: MovieCardProps) => {
  const { movie, fullWidth } = props;

  const [movieCreatorId, setMovieCreatorId] = useState<string>('');

  const { profile } = useSimpleUser(movieCreatorId);

  const { low: thumbnail } = useMovieThumbnail(movie);

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group"
      onMouseOver={() => setMovieCreatorId(movie.creator)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded md:transition-transform md:hover:scale-105">
        <div className="absolute bottom-0 left-0 flex h-3/4 w-full flex-col justify-end bg-opacity-75 bg-gradient-to-t from-black to-transparent p-3 opacity-0 transition-opacity md:group-hover:opacity-100">
          <span className="mb-1 whitespace-normal font-medium leading-5 line-clamp-2">
            {movie.title}
          </span>
          <span className="whitespace-normal text-sm font-normal opacity-75 line-clamp-1">
            {profile?.full_name || '-'}
          </span>
        </div>
        {thumbnail && (
          // <Image
          //   src={thumbnail}
          //   alt="Thumbnail"
          //   width={960}
          //   height={540}
          //   className="h-full w-full object-cover"
          // />
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
