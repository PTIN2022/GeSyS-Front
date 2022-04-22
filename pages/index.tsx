import type { NextPage } from 'next';
import { Grid, Image, Title, Space, Affix, Button } from '@mantine/core';
import {BrandGooglePlay} from "tabler-icons-react"

//import dynamic from 'next/dynamic';

//const BgImage = dynamic(() => import("../pages/BGImage"), {
  //ssr: false
//});

const Home: NextPage = () => {
  return (  
    <Grid>
      <Grid.Col span={5}>
      <Image
        src={'/img/mobil.jpg'}
        //width={}
        //height={height}
      />
      </Grid.Col>
      <Grid.Col span={5} offset={1} style={{ minHeight: 120 }}>
        <Space h={70} />
        <Title order={1}>Carga tu vehículo eléctrico sin problemas.</Title>
        <Space h={50} />
        <Title order={3}>Plazas de carga siempre a tu disponibilidad.</Title>
        <Title order={3}>Reserva desde cualquier sitio.</Title>
        <Affix position={{ bottom: 130, right: 467}}>
          <Button
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/store/search?q=electrolinera&c=apps&hl=es&gl=US"
            leftIcon={<BrandGooglePlay size={18} />}
            styles={(theme) => ({
            root: {
                backgroundColor: '#0e3bac',
                border: 0,
                height: 42,
                paddingLeft: 20,
                paddingRight: 20,

                '&:hover': {
                backgroundColor: theme.fn.darken('#0e3bac', 0.05),
                },
            },

            leftIcon: {
                marginRight: 15,
            },
            })}
          >
            Google Play
          </Button>  
        </Affix> 
        <Space h={100} />
        <Title order={6}>Aplicación sólo disponible para dispositivos Android</Title>   
      </Grid.Col>
  </Grid>
  );
}

export default Home
