import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import GeneralInfo from '../../components/GeneralInfo';
import { Stack, Modal} from '@mantine/core'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { PerfilData } from './perfil';

const AdminHome: NextPage = () => {
  // Dynamic import because of server side rendering
  const MapWithNoSSR = dynamic(() => import('../../components/MapElements/Map'), { ssr: false });
  const { user, logout } = useContext(AuthContext);
  const [ profile, setProfile ] = useState<PerfilData>(user!)

  useEffect(() => {
    setProfile(user!)
  }, [user])

  return (
    <Stack justify="flex-start" sx={(theme) => ({ minHeight: '100%', backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300 })}>
      <GeneralInfo />
      <MapWithNoSSR />
    </Stack>
  )
}

export default AdminHome
