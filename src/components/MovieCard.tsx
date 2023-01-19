import Image from 'next/image';
import Link from 'next/link';
import { posthog } from 'posthog-js';
import useMovieThumbnail from '../hooks/useMovieThumbnail';
import { Movie } from '../hooks/usePublishMovie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = (props: MovieCardProps) => {
  const { movie } = props;

  const { mid: thumbnail } = useMovieThumbnail(movie);

  const onCardClick = () => {
    posthog.capture('movie card clicked', {
      movieTitle: movie.title,
      movieId: movie.id,
    });
  };

  return (
    <Link href={`/movies/${movie.id}`} onClick={onCardClick}>
      <div className="relative aspect-video w-full overflow-hidden rounded-md md:transition-transform md:hover:scale-105">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt="Thumbnail"
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
