import { useSession } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Footer from '../src/components/layout/Footer';
import Header from '../src/components/layout/Header';
import Spinner from '../src/components/Spinner';
import useAuth from '../src/hooks/useAuth';
import useUser from '../src/hooks/useUser';

export default function Profile() {
  const session = useSession();

  const router = useRouter();

  const { signOut } = useAuth();
  const { profile, updateProfile, updatingProfile } = useUser(
    session?.user.id || ''
  );

  const initializedDefaults = useRef<boolean>(false);
  const [bio, setBio] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [youtube, setYoutube] = useState<string>('');

  const onSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const onSaveChange = () => {
    updateProfile(bio, website, twitter, instagram, youtube);
  };

  useEffect(() => {
    if (profile && !initializedDefaults.current) {
      setBio(profile.bio || '');
      setWebsite(profile.website || '');
      setTwitter(profile.twitter || '');
      setInstagram(profile.instagram || '');
      setYoutube(profile.youtube || '');
      initializedDefaults.current = true;
    }
  }, [profile]);

  if (!session) {
    return (
      <div>
        <Link href="/login">Sign In</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Blend.Stream | Profile</title>
      </Head>
      <div className="flex min-h-[100vh] flex-col">
        <Header />
        <div className="mx-4 flex-grow pt-8 md:mx-8">
          <div className="m-auto flex flex-col gap-4 md:max-w-[500px]">
            <div className="relative aspect-square w-[100px] overflow-hidden rounded-full">
              {profile?.profile_picture && (
                <Image
                  src={profile.profile_picture}
                  fill
                  alt="Profile Picture"
                />
              )}
            </div>
            <span className="text-2xl font-semibold">
              {profile?.full_name || ''}
            </span>
            <button
              onClick={onSignOut}
              className="w-min whitespace-nowrap rounded bg-white px-8 py-2 text-sm font-semibold text-black transition-all hover:bg-opacity-90"
            >
              Sign Out
            </button>
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              onBlur={onSaveChange}
              className="min-h-[100px] resize-y rounded border-none bg-zinc-900 px-4 py-2 text-sm outline-none"
            />
            <input
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              onBlur={onSaveChange}
              className="rounded border-none bg-zinc-900 px-4 py-2 text-sm outline-none"
            />
            <input
              placeholder="https://twitter.com/..."
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              onBlur={onSaveChange}
              className="rounded border-none bg-zinc-900 px-4 py-2 text-sm outline-none"
            />
            <input
              placeholder="https://instagram.com/..."
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              onBlur={onSaveChange}
              className="rounded border-none bg-zinc-900 px-4 py-2 text-sm outline-none"
            />
            <input
              placeholder="https://youtube.com/..."
              value={youtube}
              onChange={(e) => setInstagram(e.target.value)}
              onBlur={onSaveChange}
              className="rounded border-none bg-zinc-900 px-4 py-2 text-sm outline-none"
            />
            <div className="flex flex-row items-center justify-between">
              <Link
                href={`/users/${profile?.id || ''}`}
                className="text-sm underline opacity-50 transition-opacity hover:opacity-70"
              >
                View Public Profile
              </Link>
              {updatingProfile && <Spinner />}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
