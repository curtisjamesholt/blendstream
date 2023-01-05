import { useMemo } from 'react';

const useMovieThumbnail = (url: string) => {
  const thumbnails = useMemo(() => {
    if (!url) return { lowest: '', low: '', mid: '', high: '', highest: '' };

    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');

    return {
      lowest: `https://i3.ytimg.com/vi/${videoId}/default.jpg`,
      low: `https://i3.ytimg.com/vi/${videoId}/mqdefault.jpg`,
      mid: `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      high: `https://i3.ytimg.com/vi/${videoId}/sddefault.jpg`,
      highest: `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    };
  }, [url]);

  return thumbnails;
};

export const useMovieThumbnails = (urls: string[]) => {
  const thumbnails = useMemo(() => {
    return urls.map((url) => {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');

      return {
        lowest: `https://i3.ytimg.com/vi/${videoId}/default.jpg`,
        low: `https://i3.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        mid: `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        high: `https://i3.ytimg.com/vi/${videoId}/sddefault.jpg`,
        highest: `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      };
    });
  }, [urls]);

  return thumbnails;
};

export default useMovieThumbnail;
