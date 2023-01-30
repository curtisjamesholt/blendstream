import Link from 'next/link';
import { FaDiscord, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="z-10 flex w-full flex-row items-center justify-center gap-2 bg-black py-4 px-8 md:py-8">
      <div className="flex flex-col gap-2">
        {/* <span className="text-center text-sm opacity-50">
          Built with ❤️ by the{' '}
          <Link href="https://www.blender.org" target="_blank">
            <u>blender</u>
          </Link>{' '}
          community
        </span> */}
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
      {/* <span className="hidden text-sm opacity-50 md:block">
        Built with ❤️ by the{' '}
        <Link href="https://www.blender.org" target="_blank">
          <u>blender</u>
        </Link>{' '}
        community
      </span> */}
      {/* <Link href={''} target="_blank">
        <span className="flex items-center gap-2 text-sm opacity-50">
          <FaDiscord />
          Discord
        </span>
      </Link> */}
    </footer>
  );
}
