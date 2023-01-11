import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import useMovieThumbnail from '../../hooks/useMovieThumbnail';
import { Movie } from '../../hooks/usePublishMovie';
import useSubmissions from '../../hooks/useSubmissions';
import Spinner from '../Spinner';

interface SubmissionCardProps {
  submission: Movie;
}

export default function SubmissionCard(props: SubmissionCardProps) {
  const { submission } = props;

  const [title, setTitle] = useState<string>(submission.title);
  const [description, setDescription] = useState<string>(
    submission.description
  );
  const [url, setUrl] = useState<string>(submission.url);

  const { mid: thumbnail } = useMovieThumbnail(url);

  const { updateSubmission, updatingSubmission } = useSubmissions();

  const onAccept = () => {
    if (
      window.confirm(`Are you sure you want to publish '${submission.title}'?`)
    ) {
      const newSubmission = JSON.parse(JSON.stringify(submission)) as Movie;
      newSubmission.title = title;
      newSubmission.description = description;
      newSubmission.url = url;
      newSubmission.published = true;
      updateSubmission(newSubmission);
    }
  };

  const onDecline = () => {
    if (
      window.confirm(
        `Are you sure you want to decline and delete '${submission.title}'?`
      )
    ) {
      console.log('delete');
    }
  };

  return (
    <div
      key={submission.id}
      className="flex w-full flex-col overflow-hidden rounded-md bg-zinc-900 md:w-[350px]"
    >
      <div className="group relative aspect-video w-full">
        {thumbnail && (
          <Image
            src={thumbnail}
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
          <label className="text-sm font-medium text-gray-400">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded border-none bg-zinc-800 py-2 px-2 text-sm font-normal outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-400">URL</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="rounded border-none bg-zinc-800 py-2 px-2 text-sm font-normal outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-400">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px] resize-y rounded border-none bg-zinc-800 p-2 text-sm font-normal outline-none"
          />
        </div>
        <div className="flex flex-row gap-2">
          <button
            onClick={onAccept}
            disabled={updatingSubmission}
            className="flex flex-1 items-center justify-center rounded bg-green-400 bg-opacity-20 py-2 text-sm font-medium text-green-500 transition-all hover:bg-opacity-30"
          >
            {updatingSubmission ? <Spinner /> : 'Accept'}
          </button>
          <button
            onClick={onDecline}
            disabled={updatingSubmission}
            className="flex flex-1 items-center justify-center rounded bg-red-400 bg-opacity-20 py-2 text-sm font-medium text-red-500 transition-all hover:bg-opacity-30"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
