import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineColorScheme } from '@mantine/core';
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useState } from 'react';

const Home: NextPage = () => {

  const [opened, setOpened] = useState<boolean>(false);

  // Dynamic import becuase of server side rendering
  const MapWithNoSSR = dynamic(() => import('../components/MapElements/Map'), { ssr: false });

  return (
    <AppShell
      padding="xs"
      navbarOffsetBreakpoint={"sm"}
      fixed
      navbar={
        <Navbar width={{ sm: 300, lg: 400 }} p="xs" hiddenBreakpoint={"sm"} hidden={!opened}>
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={70} p="sm">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((e) => !e)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>
            <Text align='right'>Application header</Text>
          </div>
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
