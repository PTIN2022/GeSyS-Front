import type { NextPage } from 'next';
import { Image, Title, Space, Button, Text, Box, SimpleGrid } from '@mantine/core';
import {BrandGooglePlay} from "tabler-icons-react"

const Home: NextPage = () => {
  return ( 
    <Box px="auto" sx={{
      backgroundColor: '#ccdde8',
    }}>
    
    <SimpleGrid cols={2} >
      <div>
      <Image
        width={500}
        height={600}
        alt={"Foto de la aplicación móvil"}
        src={'/img/mobil.jpg'}
      />
      </div>
      <div>
        
        <Space h={60} />
        <Title order={2}>
          <Text color="#0e3bac" inherit component="span"
             weight={700}
          >
            Carga tu vehículo eléctrico sin problemas.
          </Text>
        </Title>
        <Space h={50} />
        <Title order={4}> 
          <Text color="#0e3bac" inherit component="span">
            Plazas de carga siempre a tu disponibilidad.
          </Text>
        </Title>
        <Title order={4}>
          <Text color="#0e3bac" inherit component="span">
            Reserva desde cualquier sitio.
          </Text>
        </Title>
        <Space h={90} />
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
        
        <Space h={5} />
        <Title order={5}>
          <Text  inherit component="span">
            Aplicación sólo disponible para dispositivos Android
          </Text>
        </Title>        
        </div>  
  </SimpleGrid>  
  </Box>
  );
}

export default Home
