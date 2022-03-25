import { AppShell, Header, Navbar } from '@mantine/core';
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Home: NextPage = () => {

  // Dynamic import becuase of server side rendering
  const MapWithNoSSR = dynamic(() => import('../components/MapElements/Map'), { ssr: false });

  return (
    <AppShell
      padding="xs"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          {/* Navbar content */}
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {/* Header content */}
        </Header>
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <MapWithNoSSR />
    </AppShell>
  )
}

export default Home
