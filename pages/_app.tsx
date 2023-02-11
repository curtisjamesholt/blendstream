import '../styles/globals.css';
import { Inter } from '@next/font/google';
import type { AppProps } from 'next/app';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { supabase } from '../src/utils/supabase';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 24, // 24 hours
            refetchOnWindowFocus: false,
          },
        },
      })
  );

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
      </Head>
      <Analytics />
      <div className={inter.className}>
        <SessionContextProvider
          supabaseClient={supabase}
          initialSession={pageProps.initialSession}
        >
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </SessionContextProvider>
      </div>
    </>
  );
}
