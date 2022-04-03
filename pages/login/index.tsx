import type { NextPage } from 'next'
import { Button, MantineProvider, Input, MantineTheme, Text } from '@mantine/core'
import Link from 'next/link'
import { At, BorderRadius } from 'tabler-icons-react'
const login: NextPage = () => {
  return (
    <>
    <h1>login</h1>
    <Input
      placeholder="Email"
      style={{
        width: "350px",
        marginLeft: "700px",
        BorderRadius: "10px"
        }}/>
    <Input
      placeholder="Contraseña"
      style={{
        width: "350px",
        marginLeft: "700px",
        BorderRadius: "10px"
        }}/>
    <MantineProvider theme={{
    }}
    styles={{
      Button: (theme) => ({
        root: {
          color: 'black',
          backgroundColor: theme.colors.yellow[3],
          width: "350px",
          marginLeft: "700px",
          alignItems:"center",
          borderRadius:"10px"
        }
      })
    }}
    >
    <Link href="/trabajador">
      <Button
        variant="subtle"
        color="yellow"
        >Iniciar Sesión
      </Button>
    </Link>
    </MantineProvider>
    <Text size='md' style={{
      width: "350px",
      marginLeft: "800px",
      color: "blue"
    }}
    >
        Olvidé mi contraseña?
    
    </Text>
    <Text size='md' style={{
      width: "350px",
      marginLeft: "775px",
      color: "black"
    }}
    >
        ¿No tengo cuenta?
        <text style={{
          color:"blue"
        }}> Crea una</text>
    </Text>
    </>
  )
}


export default login
