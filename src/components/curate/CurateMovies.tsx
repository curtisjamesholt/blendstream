import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { FiStar } from 'react-icons/fi';
import useMovie from '../../hooks/useMovie';
import { useFeaturedMovies, useFilteredMovies } from '../../hooks/useMovies';
import { useMovieThumbnails } from '../../hooks/useMovieThumbnail';

const CurateMovies = () => {
  const [newFeatured, setNewFeatured] = useState<string>('');
  const [searchEdit, setSearchEdit] = useState<string>('');

  const { featuredMovies, removeFeaturedMovie, removing, addFeaturedMovie } =
    useFeaturedMovies();
  const { movies: searchResults } = useFilteredMovies(newFeatured);
  const { movies: editResults } = useFilteredMovies(searchEdit);

  const selectedEditMovie = useMemo(() => {
    return editResults.find((m) => m.title === searchEdit) || null;
  }, [editResults, searchEdit]);

  const { movie: editMovie } = useMovie(selectedEditMovie?.id || '');

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
      <span className="mb-4 block text-lg font-semibold">Featured</span>
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
              className="absolute bottom-1 right-1 aspect-square w-[30px]"
              onClick={() => onFeaturedClick(m.id)}
              disabled={removing}
            >
              <FiStar
                className="fill-accent-400 stroke-accent-400 shadow-md"
                size={20}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          placeholder="Movie Title"
          onChange={(e) => setNewFeatured(e.target.value)}
          value={newFeatured}
          list="new-featured-list"
          className="w-[200px] rounded border-none bg-zinc-900 px-3 py-2 text-sm text-white outline-none"
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
          className="rounded bg-white px-4 text-sm font-semibold text-black transition-all hover:bg-opacity-90 disabled:opacity-50"
        >
          Feature
        </button>
      </div>
      <span className="mb-4 mt-8 flex items-center gap-4 text-lg font-semibold">
        Edit Movie:
        <input
          placeholder="Search Movie..."
          onChange={(e) => setSearchEdit(e.target.value)}
          value={searchEdit}
          list="edit-list"
          className="w-[200px] rounded border-none bg-transparent text-lg italic text-white outline-none"
        />
        <datalist id="edit-list">
          {editResults.map((m) => (
            <option key={m.id} value={m.title}>
              {m.id}
            </option>
          ))}
        </datalist>
      </span>
      {editMovie && <div>{editMovie.url}</div>}
    </>
  );
};

export default CurateMovies;
