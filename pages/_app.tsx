import '../styles/globals.css';
import { Inter } from '@next/font/google';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { usePostHog } from 'next-use-posthog';
import CookieBanner from '../src/components/CookieBanner';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  usePostHog('phc_ndZDodibehHFJArgqFdPFUOlk7Kvq7Ed2qId45nBYZv', {
    api_host: 'https://eu.posthog.com',
    autocapture: true,
  });

  return (
    <>
      <Head>
        <meta
          name="description"
          content="A curated collection of shortfilm productions"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Blend.Stream" key="title" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blend.stream" />
        <meta property="og:image" content="/embed_image.jpg" />
      </Head>
      <div className={inter.className}>
        <CookieBanner />
        <SessionContextProvider
          supabaseClient={supabase}
          initialSession={pageProps.initialSession}
        >
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </SessionContextProvider>
      </div>
    </>
  );
}
