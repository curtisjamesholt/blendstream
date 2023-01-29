import { useSession } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useUser from '../../hooks/useUser';
import { FiMenu, FiX } from 'react-icons/fi';
import useSubmissions from '../../hooks/useSubmissions';
import Logo from '../logo/Logo';

const Header = () => {
  const session = useSession();
  const { profile } = useUser(session?.user.id || '');

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const { movies: submissions } = useSubmissions();

  return (
    <>
      <div
        className={`sticky top-0 z-40 hidden h-14 w-full flex-row items-center justify-between border-b-[1px] border-b-white border-opacity-20 bg-black bg-opacity-0 px-8 backdrop-blur-md backdrop-brightness-75 transition-opacity md:flex`}
      >
        <div className="flex flex-1 flex-row items-center gap-8">
          <Link href={'/'} className="flex items-center">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 flex-row items-center justify-center gap-8">
          <Link
            href={'/'}
            className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
          >
            <span className="text-sm font-medium tracking-wide">Home</span>
          </Link>
          <Link
            href={'/discover'}
            className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
          >
            <span className="text-sm font-medium tracking-wide">Discover</span>
          </Link>
          {/* <Link
            href={'/'}
            target="_blank"
            className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
          >
            <FaDiscord />
          </Link> */}
        </div>
        <div className="flex flex-1 flex-row items-center justify-end gap-8">
          <Link
            href={'/submit'}
            className=" transition-transform hover:scale-105"
          >
            <span className="rounded-full bg-gradient-to-br from-accent-300 to-rose-500 py-1 px-3 text-sm font-medium tracking-wide text-black">
              Submit
            </span>
          </Link>
          {session && profile?.is_moderator && (
            <Link href={'/curate'} className="flex items-center gap-2">
              <span className="relative text-sm font-normal">
                <span className="font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100">
                  Curate
                </span>
                {submissions.length > 0 && (
                  <span className="absolute -top-2 left-12 flex h-4 items-center justify-center rounded-full bg-accent-400 px-1.5 text-xs font-bold text-black">
                    {submissions.length}
                  </span>
                )}
              </span>
            </Link>
          )}
          {session ? (
            <>
              <Link href={'/profile'}>
                <div className="relative aspect-square w-8 overflow-hidden rounded-full">
                  {profile?.profile_picture && (
                    <Image
                      src={profile.profile_picture}
                      alt="Profile Picture"
                      width={50}
                      height={50}
                      className="ph-no-capture h-full w-full object-cover"
                    />
                  )}
                </div>
              </Link>
            </>
          ) : (
            <Link
              href={'/login'}
              className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
            >
              <span className="text-sm font-normal tracking-wide">Login</span>
            </Link>
          )}
        </div>
      </div>
      <div className="fixed top-2 right-2 z-40 flex md:hidden">
        <button
          className="flex aspect-square w-[40px] items-center justify-center rounded bg-black bg-opacity-30"
          onClick={() => setShowMobileMenu(true)}
        >
          <FiMenu size={24} />
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 z-40 flex h-full w-full origin-top flex-col gap-2 bg-black px-4 pt-4 transition-transform md:hidden ${
          showMobileMenu ? 'scale-y-100' : 'scale-y-0'
        }`}
      >
        <div className="flex justify-end">
          <button onClick={() => setShowMobileMenu(false)}>
            <FiX size={24} />
          </button>
        </div>
        {session ? (
          <Link
            href="/profile"
            onClick={() => setShowMobileMenu(false)}
            className="flex items-center gap-2 py-2 px-4 text-sm font-medium"
          >
            <div className="relative aspect-square w-8 overflow-hidden rounded-full">
              {profile?.profile_picture && (
                <Image
                  src={profile.profile_picture}
                  width={50}
                  height={50}
                  className="h-full w-full object-cover"
                  alt="Profile Picture"
                />
              )}
            </div>
            Profile
          </Link>
        ) : (
          <Link
            href="/login"
            onClick={() => setShowMobileMenu(false)}
            className="py-2 px-4 text-sm font-medium"
          >
            Login
          </Link>
        )}
        <div className="h-[1px] rounded bg-gray-700"></div>
        <Link
          href="/"
          onClick={() => setShowMobileMenu(false)}
          className="py-2 px-4 text-sm font-medium"
        >
          Home
        </Link>
        <div className="h-[1px] rounded bg-gray-700"></div>
        <Link
          href="/discover"
          onClick={() => setShowMobileMenu(false)}
          className="py-2 px-4 text-sm font-medium"
        >
          Discover
        </Link>
        <div className="h-[1px] rounded bg-gray-700"></div>
        <Link
          href="/submit"
          onClick={() => setShowMobileMenu(false)}
          className="py-2 px-4 text-sm font-medium"
        >
          Submit
        </Link>
        {session && (
          <>
            <div className="h-[1px] rounded bg-gray-700"></div>
            <Link
              href="/curate"
              onClick={() => setShowMobileMenu(false)}
              className="py-2 px-4 text-sm font-medium"
            >
              Curate
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
