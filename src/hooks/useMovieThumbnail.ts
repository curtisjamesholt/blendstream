import { useMemo } from 'react';

const getVideoId = (url: string) => {
  const urlObj = new URL(url);
  if (urlObj.origin.includes('youtu.be')) {
    return urlObj.pathname.slice(1);
  }
  return urlObj.searchParams.get('v');
};

const useMovieThumbnail = (url: string) => {
  const thumbnails = useMemo(() => {
    if (!url) return { lowest: '', low: '', mid: '', high: '', highest: '' };

    const videoId = getVideoId(url);

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
      const videoId = getVideoId(url);

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
