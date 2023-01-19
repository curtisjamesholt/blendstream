import '../styles/globals.css';
import { Inter } from '@next/font/google';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import posthog from 'posthog-js';
import Script from 'next/script';
import CookieBanner from '../src/components/CookieBanner';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    posthog.init('phc_ndZDodibehHFJArgqFdPFUOlk7Kvq7Ed2qId45nBYZv', {
      api_host: 'https://eu.posthog.com',
    });
  }, []);

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
      <Script
        id="posthog-js"
        dangerouslySetInnerHTML={{
          __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('phc_ndZDodibehHFJArgqFdPFUOlk7Kvq7Ed2qId45nBYZv',{api_host:'https://eu.posthog.com'})`,
        }}
      />
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
