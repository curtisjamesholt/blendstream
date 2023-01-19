import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { FiExternalLink, FiTrash2 } from 'react-icons/fi';
import useEditMovie from '../../hooks/useEditMovie';
import { useFilteredMovies } from '../../hooks/useMovies';
import useMovieThumbnail from '../../hooks/useMovieThumbnail';
import useTags from '../../hooks/useTags';
import LabelInput from '../inputs/LabelInput';
import TagInput from '../inputs/TagInput';
import UserProfileInput from '../inputs/UserProfileInput';
import Spinner from '../Spinner';

const CurateMovies = () => {
  const [animated] = useAutoAnimate();

  const [searchEdit, setSearchEdit] = useState<string>('');

  const { movies: editResults, refetch } = useFilteredMovies(searchEdit);
  const {
    deleteMovie,
    deleting,
    deleteCustomThumbnail,
    deletingThumbnail,
    updateMovie,
    updating,
  } = useEditMovie();

  const { tags } = useTags();

  const editMovie = useMemo(() => {
    return editResults.find((m) => m.title === searchEdit) || null;
  }, [editResults, searchEdit]);

  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [editUrl, setEditUrl] = useState<string>('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editThumbnail, setEditThumbnail] = useState<string>('');
  const [editThumbnailFile, setEditThumbnailFile] = useState<File | null>(null);
  const [editCreator, setEditCreator] = useState<string>('');
  const [editCreatorPicture, setEditCreatorPicture] = useState<string>('');
  const [editPublished, setEditPublished] = useState<boolean>(false);

  const { highest } = useMovieThumbnail(
    editMovie ? { ...editMovie, url: editUrl } : null
  );

  const onDeleteMovie = async () => {
    if (
      editMovie &&
      confirm(`Are you sure you want to delete '${editMovie.title}'?`)
    ) {
      await deleteMovie(editMovie.id, editMovie.thumbnail || '');
      await refetch();
      setSearchEdit('');
    }
  };

  const onDeleteCustomThumbnail = async () => {
    if (
      editMovie &&
      editMovie.thumbnail &&
      confirm(
        `Are you sure you want to delete the custom thumbnail for '${editMovie.title}'?`
      )
    ) {
      await deleteCustomThumbnail(editMovie.id, editMovie.thumbnail);
      await refetch();
    }
  };

  const onThumbnailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target && evt.target.files && evt.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setEditThumbnail(e.target.result as string);
        }
      };
      reader.readAsDataURL(evt.target.files[0]);
      setEditThumbnailFile(evt.target.files[0]);
    } else {
      setEditThumbnailFile(null);
      setEditThumbnail('');
    }
  };

  const onUpdateMovie = async () => {
    if (editMovie) {
      await updateMovie(
        editMovie.id,
        {
          title: editTitle,
          description: editDescription,
          url: editUrl,
          tags: editTags,
          creator: editCreator,
          published: editPublished,
        },
        editThumbnailFile,
        editCreatorPicture || null
      );
      await refetch();
    }
  };

  useEffect(() => {
    if (editMovie) {
      setEditTitle(editMovie.title);
      setEditDescription(editMovie.description);
      setEditUrl(editMovie.url);
      setEditTags(editMovie.tags);
      setEditThumbnail('');
      setEditThumbnailFile(null);
      setEditCreator(editMovie.creator);
      setEditPublished(editMovie.published);
    }
  }, [editMovie]);

  return (
    <>
      <div>
        <input
          placeholder="Search Movie..."
          onChange={(e) => setSearchEdit(e.target.value)}
          value={searchEdit}
          list="edit-list"
          className="mb-4 w-full rounded border-none bg-transparent text-lg font-semibold italic text-white outline-none md:max-w-[500px]"
        />
        <datalist id="edit-list">
          {editResults.map((m) => (
            <option key={m.id} value={m.title}>
              {m.id}
            </option>
          ))}
        </datalist>
      </div>
      <div
        className="flex flex-col gap-4 md:max-w-[450px]"
        ref={animated as any}
      >
        {editMovie ? (
          <>
            <div className="relative aspect-video w-full overflow-hidden rounded-md">
              {(highest || editThumbnail) && (
                <Image
                  src={editThumbnail ? editThumbnail : highest}
                  alt="Thumbnail"
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover"
                />
              )}
              <Link
                target={'_blank'}
                href={`/movies/${editMovie.id}`}
                className="absolute flex h-full w-full items-center justify-center bg-black bg-opacity-50 opacity-0 transition-all hover:opacity-100"
              >
                <FiExternalLink size={20} />
              </Link>
              {editMovie.thumbnail && (
                <button
                  className="absolute bottom-2 right-2 rounded bg-red-700 px-4 py-1 text-sm font-medium text-white transition-all hover:brightness-90"
                  onClick={onDeleteCustomThumbnail}
                  disabled={deletingThumbnail}
                >
                  Delete Thumbnail
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-400">
                {'Custom Thumbnail'}
              </label>
              <input type={'file'} onChange={onThumbnailChange} />
            </div>
            <UserProfileInput
              creator={editCreator}
              setCreator={setEditCreator}
              creatorPicture={editCreatorPicture}
              setCreatorPicture={setEditCreatorPicture}
            />
            <LabelInput
              id="title"
              label="Title"
              placeholder="Title"
              setValue={setEditTitle}
              value={editTitle}
            />
            <LabelInput
              id="url"
              label="URL"
              placeholder="www.youtube.com/watch?v=..."
              setValue={setEditUrl}
              value={editUrl}
            />
            <LabelInput
              id="description"
              label="Description"
              placeholder="Description"
              setValue={setEditDescription}
              value={editDescription}
              area
            />
            <TagInput
              id="tags"
              options={tags.map((t) => t.tag)}
              setTags={setEditTags}
              tags={editTags}
              validateTag={(tag) => tags.map((t) => t.tag).includes(tag)}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editPublished}
                onChange={(e) => setEditPublished(e.target.checked)}
                className="cursor-pointer rounded border-none bg-zinc-900 py-2 px-3 text-sm font-normal outline-none"
              />
              <label className="text-sm font-medium text-gray-400">
                Published
              </label>
            </div>
            <div className="flex justify-between gap-4">
              <button
                className="flex w-[150px] items-center justify-center whitespace-nowrap rounded bg-white py-2 text-sm font-medium text-black transition-all hover:bg-opacity-90"
                onClick={onUpdateMovie}
                disabled={updating}
              >
                {updating ? <Spinner /> : 'Save Changes'}
              </button>
              <button
                className="w-min whitespace-nowrap rounded bg-red-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-opacity-90"
                onClick={onDeleteMovie}
                disabled={deleting}
              >
                <FiTrash2 />
              </button>
            </div>
          </>
        ) : (
          <span className="text-sm opacity-60">No movie selected</span>
        )}
      </div>
    </>
  );
};

export default CurateMovies;
