import type { NextPage } from 'next';
import { BackgroundImage, Grid, Image, Title, Space, Affix, Button, Text } from '@mantine/core';
import {BrandGooglePlay} from "tabler-icons-react"

const Home: NextPage = () => {
  return (  
    <BackgroundImage
          src="/img/blau.jpg"
          radius="sm"
        >
    <Grid>
      
      <Grid.Col span={5}>
      <Image
        alt={"Foto de la aplicación móvil"}
        src={'/img/mobil.jpg'}
      />
      </Grid.Col>
      <Grid.Col span={6} offset={0.5} style={{ minHeight: 120 }}>
        
        <Space h={60} />
        <Title order={1}>
          <Text color="#0e3bac" inherit component="span"
             weight={700}
          >
            Carga tu vehículo eléctrico sin problemas.
          </Text>
        </Title>
        <Space h={50} />
        <Title order={3}> 
          <Text color="#0e3bac" inherit component="span">
            Plazas de carga siempre a tu disponibilidad.
          </Text>
        </Title>
        <Title order={3}>
          <Text color="#0e3bac" inherit component="span">
            Reserva desde cualquier sitio.
          </Text>
        </Title>
        <Affix position={{ bottom: 130, right: 535}}>
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
        <Space h={120} />
        <Title order={6}>
          <Text color="#0e3bac" inherit component="span">
            Aplicación sólo disponible para dispositivos Android
          </Text>
        </Title>        
      </Grid.Col>    
  </Grid>
  </BackgroundImage>  
  );
}

export default Home
