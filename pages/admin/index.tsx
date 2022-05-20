import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import GeneralInfo from '../../components/GeneralInfo';
import { Stack, Modal} from '@mantine/core'
import { useEffect, useState } from 'react';

const AdminHome: NextPage = () => {
  // Dynamic import becuase of server side rendering
  const MapWithNoSSR = dynamic(() => import('../../components/MapElements/Map'), { ssr: false });

  const [opened, setOpened] = useState(true);
  const [count, setCount] = useState('0');

  //No es lo más limpio, pero he pensado en poner el cálculo para saber si hacer el warning aqui también :)

  useEffect(() => {
    // Access initial value from session storage
    let pageView = sessionStorage.getItem("pageView");
    if (pageView == null) {
      // Initialize page views count
      pageView = '1';
      
    } else {
      // Increment count
      pageView = '0';
    }
    // Update session storage
    sessionStorage.setItem("pageView", pageView);
    setCount(pageView);
  }, []); //No dependency to trigger in each page load



  return (
    
    <Stack justify="flex-start" sx={(theme) => ({ minHeight: '100%', backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 300 })}>
        {count == '1' && <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="¡Consumo bajo!"
          withCloseButton={false}
        >
        Se está desaprovechando la potencia contratada, por favor revisa el apartado de estadísticas para más información.
      </Modal>}
      <GeneralInfo />
      <MapWithNoSSR />
    </Stack>
  )
}

export default AdminHome
