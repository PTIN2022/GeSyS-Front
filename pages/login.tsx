import type { NextPage } from 'next'
import { Button, MantineProvider, Input, MantineTheme, Text, AppShell, Container } from '@mantine/core'
import Link from 'next/link'

const Login: NextPage = () => {
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

      <Container mt={"xl"} size={"xs"} px={"xs"}>
        <Input type={"text"} placeholder={"Email"} />
        <Input type="password" placeholder="Contraseña" mt={"xs"} />

        <Link href="/admin" passHref={true}>
          <Button mt={"xl"}>
            Iniciar Sesión
          </Button>
        </Link>
        
        <Text size='md' style={{
          color: "blue"
        }}>
          Restablecer contraseña
        </Text>
      </Container>
    </MantineProvider>
    </>
  )
}

export default Login
