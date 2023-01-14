import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import useUser from '../../hooks/useUser';
import { useSearchedUsers } from '../../hooks/useUsers';

interface UserProfileInputProps {
  creator: string;
  setCreator: (creator: string) => void;
  creatorPicture: string;
  setCreatorPicture: (creatorPicture: string) => void;
}

const UserProfileInput = (props: UserProfileInputProps) => {
  const { creator, setCreator, creatorPicture, setCreatorPicture } = props;

  const { users } = useSearchedUsers(creator);

  const { profile } = useUser(creator);

  return (
    <>
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
    </>
  );
};

export default UserProfileInput;
