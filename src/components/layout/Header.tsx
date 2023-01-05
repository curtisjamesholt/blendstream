import { useSession } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useUser from '../../hooks/useUser';
import { FiGithub, FiMenu, FiX } from 'react-icons/fi';
import { FaDiscord, FaGithub } from 'react-icons/fa';

const Header = () => {
  const session = useSession();
  const { profile } = useUser(session?.user.id || '');

  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <>
      <div
        className={`sticky top-0 z-40 hidden h-16 w-full flex-row items-center justify-between bg-black bg-opacity-80 px-8 backdrop-blur transition-opacity md:flex`}
      >
        <div className="flex flex-row items-center gap-8">
          <Link
            href={'/'}
            className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
          >
            <span className="text-sm font-normal">Home</span>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-8">
          <Link
            href={'/discover'}
            className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
          >
            <span className="text-sm font-normal">Discover</span>
          </Link>
          <Link
            href={'/'}
            target="_blank"
            className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
          >
            <FaDiscord />
          </Link>
          <Link
            href={'https://github.com/joshuaKnauber/shortfilms'}
            target="_blank"
            className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
          >
            {/* <span className="text-sm font-normal">Discover</span> */}
            <FaGithub />
          </Link>
        </div>
        <div className="flex flex-row items-center gap-8">
          <Link
            href={'/submit'}
            className=" transition-transform hover:scale-105"
          >
            <span className="rounded bg-white py-1 px-3 text-sm font-medium text-black">
              Submit
            </span>
          </Link>
          {session ? (
            <>
              <Link href={'/profile'}>
                <div className="relative aspect-square w-8 overflow-hidden rounded-full">
                  {profile?.profile_picture && (
                    <Image
                      src={profile.profile_picture}
                      fill
                      alt="Profile Picture"
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
              <span className="text-sm font-normal">Login</span>
            </Link>
          )}
        </div>
      </div>
      <div className="fixed top-2 right-2 z-10 flex md:hidden">
        <button
          className="flex aspect-square w-[40px] items-center justify-center rounded bg-black bg-opacity-30"
          onClick={() => setShowMobileMenu(true)}
        >
          <FiMenu size={24} />
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 z-20 flex h-full w-full origin-top flex-col bg-black transition-transform md:hidden ${
          showMobileMenu ? 'scale-y-100' : 'scale-y-0'
        }`}
      >
        <button onClick={() => setShowMobileMenu(false)}>
          <FiX size={24} />
        </button>
        <Link href="/" onClick={() => setShowMobileMenu(false)}>
          Home
        </Link>
        <Link href="/profile" onClick={() => setShowMobileMenu(false)}>
          Profile
        </Link>
        <Link href="/submit" onClick={() => setShowMobileMenu(false)}>
          Submit
        </Link>
        <Link href="/discover" onClick={() => setShowMobileMenu(false)}>
          Discover
        </Link>
      </div>
    </>
  );
};

export default Header;
