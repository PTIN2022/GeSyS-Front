import type { NextPage } from 'next'
import { Button, MantineProvider, Input, Box, Text, Modal, Group, BackgroundImage, Container, Image, TextInput } from '@mantine/core'
import Link from 'next/link'
import { useModals } from '@mantine/modals';
import { useForm } from '@mantine/form';
import { useState } from 'react';
const Login: NextPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'email incorrecto'),
    },
  });
  const [opened, setOpened] = useState(false);
  return (
    <>
      <MantineProvider
        styles={{
        Button: (theme) => ({
          root: {
            color: 'black',
            backgroundColor: theme.colors.blue[3],
            width: '100%'
          }
        })
      }}>
      <Modal opened={opened}
        onClose={() => setOpened(false)}
        title="Introduzca el correo para solicitar nueva contraseña"
      >
        <Box mx="auto">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              required
              label="Email"
              placeholder="@email.com"
              {...form.getInputProps('email')}
              
            />

            <Group position="center" mt="md">
            <Button type="submit"  onClick={() => setOpened(false)} >Solicitar</Button>
              <Text align='center' color={'black'} onClick={() => setOpened(false)} >
                <Link href="login">
                  Cancelar
                </Link>
              </Text>
            </Group>
          </form>
        </Box>
      </Modal>

    <Box sx={{ Width:'100%' }} mx="auto">
    <BackgroundImage
      src="/img/fondo.jpeg"
      radius="sm"
      >

        
      <Container size={"xs"} px={"xs"}>
      <div style={{ width: 200, marginLeft: 'auto', marginRight: 'auto' }}>
      <Image
        radius="md"
        src={'/img/logofeo.png'}
        alt={"Foto de la aplación móvil"}
      />
    </div>
        <Text align='center' size='xl' style={{
          color:'blue'
          
          }}>
          Bienvenido a Gesys
        </Text>

        <Input type={"text"} placeholder={"Email"} />
        <Input type="password" placeholder="Contraseña" mt={"xs"} />

        <Link href="/admin" passHref={true}>
          <Button mt={"xl"}>
            Iniciar Sesión
          </Button>
        </Link>
        
        <Text align='center' color={'blue'} onClick={() => setOpened(true)} >
          <Link href="login">
            Olvidé mi contraseña?
          </Link>
        </Text>
        <Text mt={480} align='center' color={'black'}>
          <Link href="admin">
            about
          </Link>
            |
          <Link href="admin">
            Network
          </Link>
            |
            <Link href="admin">
            contact
          </Link>
        </Text>
      </Container>

    </BackgroundImage>
    </Box>
    </MantineProvider>
    </>
    
  )
}

export default Login
