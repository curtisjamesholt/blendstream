import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiInfo, FiStar } from 'react-icons/fi';
import { useFeaturedMovies, useFilteredMovies } from '../../hooks/useMovies';
import { useMovieThumbnails } from '../../hooks/useMovieThumbnail';

const CurateFeatured = () => {
  const [newFeatured, setNewFeatured] = useState<string>('');

  const { featuredMovies, removeFeaturedMovie, removing, addFeaturedMovie } =
    useFeaturedMovies();
  const { movies: searchResults } = useFilteredMovies(newFeatured);

  const thumbnails = useMovieThumbnails(featuredMovies);

  const onFeaturedClick = (id: string) => {
    removeFeaturedMovie(id);
  };

  const addFeatured = () => {
    const movie = searchResults.find((m) => m.title === newFeatured);
    if (movie) {
      addFeaturedMovie(movie.id);
      setNewFeatured('');
    }
  };

  return (
    <>
      <span className="mb-2 block text-lg font-semibold">Featured</span>
      <span className="mb-4 flex items-center gap-2 text-sm font-normal opacity-50">
        <FiInfo />
        Movies are shown in different random order on every page visit
      </span>
      <div className="mb-4 flex gap-2">
        <input
          placeholder="Movie Title..."
          onChange={(e) => setNewFeatured(e.target.value)}
          value={newFeatured}
          list="new-featured-list"
          className="w-[350px] rounded border-none bg-zinc-900 px-3 py-2 text-sm text-white outline-none"
        />
        <datalist id="new-featured-list">
          {searchResults.map((m) => (
            <option key={m.id} value={m.title}>
              {m.id}
            </option>
          ))}
        </datalist>
        <button
          onClick={addFeatured}
          disabled={newFeatured === ''}
          className="whitespace-nowrap rounded bg-white px-4 text-sm font-semibold text-black transition-all hover:bg-opacity-90 disabled:opacity-50"
        >
          Add Featured
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {featuredMovies.map((m, index) => (
          <div
            key={m.id}
            className="relative aspect-video w-[200px] overflow-hidden rounded-md border-2 border-zinc-900"
          >
            {thumbnails[index] && (
              <Link href={`/movies/${m.id}`}>
                <Image
                  src={thumbnails[index].mid}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </Link>
            )}
            <button
              className="absolute bottom-1 right-1 flex aspect-square w-[30px] items-center justify-center rounded-full bg-white bg-opacity-20 transition-all hover:bg-opacity-30"
              onClick={() => onFeaturedClick(m.id)}
              disabled={removing}
            >
              <FiStar className="fill-accent-600 stroke-accent-600" size={18} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CurateFeatured;
