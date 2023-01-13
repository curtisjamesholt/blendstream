import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import useMovieThumbnail from '../../hooks/useMovieThumbnail';
import { Movie } from '../../hooks/usePublishMovie';
import useSubmissions from '../../hooks/useSubmissions';
import useTags from '../../hooks/useTags';
import useUser from '../../hooks/useUser';
import { useSearchedUsers } from '../../hooks/useUsers';
import TagInput from '../inputs/TagInput';
import Spinner from '../Spinner';

interface SubmissionCardProps {
  submission: Movie;
}

export default function SubmissionCard(props: SubmissionCardProps) {
  const { submission } = props;

  const [title, setTitle] = useState<string>(submission.title);
  const [creator, setCreator] = useState<string>(submission.creator);
  const [description, setDescription] = useState<string>(
    submission.description
  );
  const [url, setUrl] = useState<string>(submission.url);
  const [tags, setTags] = useState<string[]>(submission.tags);

  const [creatorPicture, setCreatorPicture] = useState<string>('');

  const [readFile, setReadFile] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { users } = useSearchedUsers(creator);

  const { profile } = useUser(creator);

  const { tags: allTags } = useTags();

  const { highest: thumbnail } = useMovieThumbnail({
    ...submission,
    url: url,
  });

  const { publishSubmission, publishingSubmission, deleteMovie, deleting } =
    useSubmissions();

  const onAccept = () => {
    if (
      window.confirm(`Are you sure you want to publish '${submission.title}'?`)
    ) {
      const newSubmission = JSON.parse(JSON.stringify(submission)) as Movie;
      newSubmission.title = title;
      newSubmission.description = description;
      newSubmission.url = url;
      newSubmission.published = true;
      newSubmission.tags = tags;
      publishSubmission(
        newSubmission,
        selectedFile || null,
        creatorPicture || null
      );
    }
  };

  const onDecline = () => {
    if (
      window.confirm(
        `Are you sure you want to decline and delete '${submission.title}'?`
      )
    ) {
      deleteMovie(submission.id);
    }
  };

  const onThumbnailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target && evt.target.files && evt.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setReadFile(e.target.result as string);
        }
      };
      reader.readAsDataURL(evt.target.files[0]);
      setSelectedFile(evt.target.files[0]);
    } else {
      setSelectedFile(null);
      setReadFile('');
    }
  };

  return (
    <div
      key={submission.id}
      className="flex w-full flex-col overflow-hidden rounded-md border-2 border-zinc-800 bg-zinc-900 bg-opacity-25 md:w-[350px]"
    >
      <div className="group relative aspect-video w-full">
        {(thumbnail || readFile) && (
          <Image
            src={readFile ? readFile : thumbnail}
            fill
            alt="Thumbnail"
            className="object-cover"
          />
        )}
        <Link href={url} target="_blank">
          <div className="absolute flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 transition-all group-hover:opacity-100">
            <FiExternalLink size={20} />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-400">Creator</label>
          <div className="flex items-center gap-2">
            {profile?.profile_picture && (
              <div className="relative block aspect-square w-[40px] overflow-hidden rounded-full bg-zinc-900">
                <Image
                  src={profile.profile_picture}
                  alt="Profile Picture"
                  className="object-cover"
                  fill
                />
                <Link
                  target={'_blank'}
                  href={`/users/${profile.id}`}
                  className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-25 opacity-0 transition-opacity hover:opacity-100"
                >
                  <FiExternalLink />
                </Link>
              </div>
            )}
            <input
              value={creator}
              list="creators"
              placeholder="Creator"
              onChange={(e) => setCreator(e.target.value)}
              className="flex-1 rounded border-none bg-zinc-900 py-2 px-3 text-sm font-normal outline-none"
            />
            <datalist id="creators">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.full_name}
                </option>
              ))}
            </datalist>
          </div>
        </div>
        {!profile && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-400">
              Creator Profile Picture
            </label>
            <input
              value={creatorPicture}
              placeholder="https://yt3.googleusercontent.com/ytc/..."
              onChange={(e) => setCreatorPicture(e.target.value)}
              className="rounded border-none bg-zinc-900 py-2 px-3 text-sm font-normal outline-none"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-400">Title</label>
          <input
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="rounded border-none bg-zinc-900 py-2 px-3 text-sm font-normal outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-400">URL</label>
          <input
            value={url}
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            onChange={(e) => setUrl(e.target.value)}
            className="rounded border-none bg-zinc-900 py-2 px-3 text-sm font-normal outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-400">
            {'Thumbnail (optional)'}
          </label>
          <input type={'file'} onChange={onThumbnailChange} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-400">Tags</label>
          <TagInput
            tags={tags}
            setTags={setTags}
            id="submission-tags"
            options={allTags.map((tag) => tag.tag)}
            validateTag={(tag) => allTags.map((t) => t.tag).includes(tag)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-400">
            Description
          </label>
          <textarea
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px] resize-y rounded border-none bg-zinc-900 p-3 text-sm font-normal outline-none"
          />
        </div>
        <div className="flex flex-row gap-2">
          <button
            onClick={onAccept}
            disabled={publishingSubmission}
            className="flex flex-1 items-center justify-center rounded bg-green-400 bg-opacity-20 py-2 text-sm font-medium text-green-500 transition-all hover:bg-opacity-30"
          >
            {publishingSubmission ? <Spinner /> : 'Accept'}
          </button>
          <button
            onClick={onDecline}
            disabled={deleting}
            className="flex flex-1 items-center justify-center rounded bg-red-400 bg-opacity-20 py-2 text-sm font-medium text-red-500 transition-all hover:bg-opacity-30"
          >
            {deleting ? <Spinner /> : 'Decline'}
          </button>
        </div>
      </div>
    </div>
  );
}
