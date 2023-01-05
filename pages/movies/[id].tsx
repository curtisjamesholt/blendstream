import { useRouter } from 'next/router';
import useMovie from '../../src/hooks/useMovie';
import Link from 'next/link';
import useUser from '../../src/hooks/useUser';
import Head from 'next/head';
import useMovieThumbnail from '../../src/hooks/useMovieThumbnail';

export default function Movie() {
  const router = useRouter();
  const { id } = router.query;

  const { movie } = useMovie(typeof id === 'string' ? id : '');
  const { high } = useMovieThumbnail(movie?.url || '');
  const { profile } = useUser(movie?.creator || '');

  if (!movie) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <div>
        <p>{movie.title}</p>
        <img src={profile?.profile_picture || ''} />
        <p>{profile?.full_name}</p>
        <Link href={`/`}>Back</Link>
        <br />
        <Link href={`/watch/${movie.id}`}>Watch</Link>
        <img
          src={high || ''}
          style={{
            width: '100vw',
            aspectRatio: '16/9',
            objectFit: 'cover',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1,
            filter: 'blur(10px) brightness(0.25)',
          }}
        />
      </div>
    </>
  );
}
