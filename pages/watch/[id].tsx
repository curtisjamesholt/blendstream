import { useRouter } from "next/router";
import useMovie from "../../src/hooks/useMovie";
import ReactPlayer from "react-player";
import Link from "next/link";
import Head from "next/head";

export default function Player() {
  const router = useRouter();
  const { id } = router.query;

  const { movie, ytThumnailUrl } = useMovie(typeof id === "string" ? id : "");

  if (!movie) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <div style={{ overflow: "hidden" }}>
        <div style={{ position: "fixed", top: "50%", left: 0 }}>
          <Link href={`/movies/${movie.id}`}>Back</Link>
        </div>
        <ReactPlayer
          url={movie.url}
          playing={true}
          width={"100vw"}
          height={"100vh"}
          light
          controls
        />
      </div>
    </>
  );
}
