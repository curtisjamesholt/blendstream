import Link from 'next/link';
import { FaDiscord, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center gap-2 bg-black py-4 px-8 md:flex-row md:justify-between md:py-8">
      <span className="text-sm opacity-50 md:hidden">
        Made with ❤️ by the blender community
      </span>
      <Link
        href={'https://github.com/joshuaKnauber/shortfilms'}
        target="_blank"
      >
        <span className="flex items-center gap-2 text-sm opacity-50">
          <FaGithub />
          Contribute
        </span>
      </Link>
      <span className="hidden text-sm opacity-50 md:block">
        Built with ❤️ by the{' '}
        <Link href="https://www.blender.org" target="_blank">
          <u>blender</u>
        </Link>{' '}
        community
      </span>
      <Link href={''} target="_blank">
        <span className="flex items-center gap-2 text-sm opacity-50">
          <FaDiscord />
          Discord
        </span>
      </Link>
    </footer>
  );
}
