import CookieConsent from 'react-cookie-consent';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { useState } from 'react';

const CookieBanner = () => {
  const [showCookieDetails, setShowCookieDetails] = useState<boolean>(false);

  return (
    <CookieConsent
      buttonText="Got it!"
      cookieName="cookie_consent"
      contentClasses="text-sm"
      containerClasses="bg-black flex items-start flex-row gap-4 bg-opacity-80 backdrop-blur-sm fixed right-0 bottom-0 md:m-4 md:bottom-2 md:right-2 z-50 w-full md:w-min right-0 p-4 md:rounded-md border-2 border-zinc-500 border-opacity-20"
      buttonClasses="text-sm bg-white font-medium rounded-md px-3 py-1 text-black whitespace-nowrap"
      disableStyles
    >
      <div className="flex flex-col items-start">
        <span className="mb-2 font-medium opacity-90 md:whitespace-nowrap">
          By using this site you agree to our use of cookies
        </span>
        <button
          onClick={() => setShowCookieDetails((curr) => !curr)}
          className="flex flex-row items-center gap-1 opacity-70"
        >
          {showCookieDetails ? <FiChevronDown /> : <FiChevronRight />}
          Details
        </button>
        {showCookieDetails && (
          <span className="ml-4 mt-1 text-sm opacity-70">
            We use cookies to keep you signed in and track analytics with{' '}
            <Link
              href={'https://www.posthog.com'}
              target="_blank"
              className="underline"
            >
              posthog
            </Link>
            . We use these to understand how people use the site and improve
            your experience here.
          </span>
        )}
      </div>
    </CookieConsent>
  );
};

export default CookieBanner;
