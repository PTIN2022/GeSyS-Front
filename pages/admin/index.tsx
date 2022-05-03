import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import GeneralInfo from '../../components/GeneralInfo';
import { Stack } from '@mantine/core'

const AdminHome: NextPage = () => {
  // Dynamic import becuase of server side rendering
  const MapWithNoSSR = dynamic(() => import('../../components/MapElements/Map'), { ssr: false });

  return (
    <Stack justify="flex-start" sx={(theme) => ({ minHeight: '100%', backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300 })}>
      <GeneralInfo />
      <MapWithNoSSR />
    </Stack>
  )
}

export default AdminHome
