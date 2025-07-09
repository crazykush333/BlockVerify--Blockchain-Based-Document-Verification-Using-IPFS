import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import React, { ReactElement } from 'react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps): ReactElement {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}