import type { NextPage } from 'next'
import { Button, Input, MantineTheme, Text, AppShell, Container } from '@mantine/core'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useRouter } from 'next/router'

const Login: NextPage = () => {

  const route = useRouter()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { user, login } = useContext(AuthContext)

  const usernameChange = (e: any) => {
    setUsername(e.target.value)
  }

  const passwordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const loginClick = async () => {
    const response = await login(username, password)
    console.log(response)
    if (response === 200) {
      route.push('/admin/')
    }
    else {
      alert('Usuario o contraseña incorrectos')
    }
  }

  useEffect(() => {
    if (user) {
      route.push('/admin/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Container mt={"xl"} size={"xs"} px={"xs"}>
        <Input type={"text"} placeholder={"Username"} value={username} onChange={usernameChange} />
        <Input type="password" placeholder="Contraseña" value={password} onChange={passwordChange} mt={"xs"} />

        <Button mt={"xl"} onClick={loginClick}>
          Iniciar Sesión
        </Button>
        
        <Text size='md' style={{
          color: "blue"
        }}>
          Restablecer contraseña
        </Text>
      </Container>
    </>
  )
}

export default Login
