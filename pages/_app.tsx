import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NextRouter, useRouter } from 'next/router';
import '../styles/globals.css'

import BaseAdministracion from '../components/Base/BaseAdministracion';
import BasicLandingUser from '../components/Base/BaseLandingUser';
import Login from './login';
import { AuthContextProvider } from '../contexts/AuthContextProvider';

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
  else if (routeElements[1] == 'login') {
    return <Login />
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
        styles={{ 
          Button: { root: { 
            backgroundColor :"#0e3bac", 
            color:"white", 
        } }, 
          Text: {root: { color :"#0e3bac"}}, //#0e3bac
        }}

        theme={{
          fontFamily: 'Verdana, Geneva, sans-serif',
          colorScheme: 'light',
          headings:{
            sizes: {
              h1: { fontSize: 40 },
              h3: { fontSize: 25 },
              h6: { fontSize: 12 },
              //sizes from landing page:
              h2: { fontSize: 55 },
              h4: { fontSize: 30 },
              h5: { fontSize: 12 },
            },   
          }, 
        }}
      >
        <AuthContextProvider>
          { renderSwitch(router, props) }
        </AuthContextProvider>
      </MantineProvider>
    </>
  );
  
}

export default App;