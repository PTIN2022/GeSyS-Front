import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NextRouter, useRouter } from 'next/router';
import BaseAdministracion from '../components/BaseAdministracion';

import '../styles/globals.css'
import BasicLandingUser from '../components/BaseLandingUser';


// Render base switch
const renderSwitch = (valRouter: NextRouter, props: AppProps) => {

  const { route } = valRouter;

  const routeElements = route.split('/');

  if (routeElements[1] == '_error') {
    // Default error page
    return <h1>404</h1>
  }
  else if (routeElements[1] == 'admin') {
    // Default client landing page
    return <BaseAdministracion {...props} />;
  }
  else if (routeElements[1] == '') {
    // User landing page (publicidad)
    return <BasicLandingUser {...props} />;
  }
  
}

const App = (props: AppProps) => {

  const router = useRouter();

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
          colorScheme: 'light',
          primaryColor: 'teal'
        }}
      >
        { renderSwitch(router, props) }
      </MantineProvider>
    </>
  );
  
}

export default App;