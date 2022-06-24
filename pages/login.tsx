import type { NextPage } from 'next'
import { Button, MantineProvider, Input, Box, Text, Modal, Group, BackgroundImage, Container, Image, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

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

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { login } = useContext(AuthContext)

  const usernameChange = (e: any) => {
    setUsername(e.target.value)
  }

  const passwordChange = (e: any) => {
    setPassword(e.target.value)
  }

  return (
    <>
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
                Cancelar
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

        <Input type={"text"} placeholder={"Username"} value={username} onChange={usernameChange} />
        <Input type="password" placeholder="Contraseña" value={password} onChange={passwordChange} mt={"xs"} />

        <Button mt={"xl"} onClick={() => login(username, password)}>
          Iniciar Sesión
        </Button>
       
        <Text align='center' color={'blue'} onClick={() => setOpened(true)} >
          Olvidé mi contraseña?
        </Text>
      </Container>
    </BackgroundImage>
    </Box>
    </>
    
  )
}

export default Login
