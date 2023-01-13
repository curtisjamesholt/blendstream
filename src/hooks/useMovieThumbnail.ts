import { useMemo } from 'react';
import { Movie } from './usePublishMovie';

const getVideoId = (url: string) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.origin.includes('youtu.be')) {
      return urlObj.pathname.slice(1);
    }
    return urlObj.searchParams.get('v');
  } catch (error) {
    return '';
  }
};

const useMovieThumbnail = (movie: Movie | null) => {
  const thumbnails = useMemo(() => {
    if (!movie) return { lowest: '', low: '', mid: '', high: '', highest: '' };

    if (movie.thumbnail) {
      const thumbnailUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/thumbnails/${movie.thumbnail}`;
      return {
        lowest: thumbnailUrl,
        low: thumbnailUrl,
        mid: thumbnailUrl,
        high: thumbnailUrl,
        highest: thumbnailUrl,
      };
    }

    const videoId = getVideoId(movie.url);

    return {
      lowest: `https://i3.ytimg.com/vi/${videoId}/default.jpg`,
      low: `https://i3.ytimg.com/vi/${videoId}/mqdefault.jpg`,
      mid: `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      high: `https://i3.ytimg.com/vi/${videoId}/sddefault.jpg`,
      highest: `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    };
  }, [movie]);

  return thumbnails;
};

export const useMovieThumbnails = (movies: Movie[]) => {
  const thumbnails = useMemo(() => {
    return movies.map((movie) => {
      if (movie.thumbnail) {
        const thumbnailUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/thumbnails/${movie.thumbnail}`;
        return {
          lowest: thumbnailUrl,
          low: thumbnailUrl,
          mid: thumbnailUrl,
          high: thumbnailUrl,
          highest: thumbnailUrl,
        };
      }

      const videoId = getVideoId(movie.url);

      return {
        lowest: `https://i3.ytimg.com/vi/${videoId}/default.jpg`,
        low: `https://i3.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        mid: `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        high: `https://i3.ytimg.com/vi/${videoId}/sddefault.jpg`,
        highest: `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      };
    });
  }, [movies]);

  return thumbnails;
};

export default useMovieThumbnail;
