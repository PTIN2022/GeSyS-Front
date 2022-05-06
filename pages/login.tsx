import type { NextPage } from 'next'
import { Button, Input, MantineTheme, Text, AppShell, Container } from '@mantine/core'
import Link from 'next/link'

const Login: NextPage = () => {
  return (
    <>
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
    </>
  )
}

export default Login
