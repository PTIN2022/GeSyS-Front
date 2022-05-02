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
            backgroundColor: "#0e3bac",
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
        
        <Text size='md' underline color= "#0e3bac">
          Restablecer contraseña
        </Text>
      </Container>
    </MantineProvider>
    </>
  )
}

export default Login
