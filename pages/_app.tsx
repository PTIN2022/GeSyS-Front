import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

import '../styles/globals.css'

const App = (props: AppProps) => {

  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="Description" content="GeSyS panel de administracion" />
        <meta name="robots" content="all" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: 'Verdana, Geneva, sans-serif',
          colorScheme: 'light'
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
  
}

export default App;