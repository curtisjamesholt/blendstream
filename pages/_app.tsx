import '../styles/globals.css';
import { Inter } from '@next/font/google';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { supabase } from '../src/utils/supabase';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
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
      <Analytics />
      <div className={inter.className}>
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
