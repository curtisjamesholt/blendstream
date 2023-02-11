import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const thumbnail = searchParams.get('thumbnail') || '';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: 'black',
          width: '100%',
          height: '100%',
        }}
      >
        <img
          src={thumbnail}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
