import Link from 'next/link';
import { FaDiscord, FaGithub, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="z-10 flex w-full flex-col items-center justify-between gap-2 bg-black py-4 px-8 md:flex-row md:py-8">
      <span></span>
      <div className="flex flex-col gap-2">
        <span className="text-center text-sm opacity-50">
          <i>
            <Link href="/">blend.stream</Link>
          </i>{' '}
          was made by{' '}
          <Link
            className="underline"
            href={'https://www.youtube.com/channel/UCzghqpGuEmk4YdVewxA79GA'}
            target="_blank"
          >
            Curtis Holt
          </Link>{' '}
          and{' '}
          <Link
            className="underline"
            href={'https://twitter.com/joshuaKnauber'}
            target="_blank"
          >
            Joshua Knauber
          </Link>
        </span>
      </div>
      <Link
        href={'https://www.youtube.com/watch?v=EJLg0fX2yFI'}
        target="_blank"
      >
        <span className="flex items-center gap-2 text-sm opacity-50">
          <FaYoutube />
          About
        </span>
      </Link>
    </footer>
  );
}
