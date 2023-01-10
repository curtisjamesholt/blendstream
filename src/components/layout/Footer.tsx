import Link from 'next/link';
import { FaDiscord, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="flex w-full items-center gap-2 bg-black py-4 px-8 flex-row justify-center md:py-8">
      <span className="text-sm opacity-50">
        Made with ❤️ by the blender community
      </span>
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
