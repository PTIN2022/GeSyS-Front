import type { NextPage } from 'next'
import { Button, MantineProvider, MantineTheme } from '@mantine/core'
import Link from 'next/link'

const login: NextPage = () => {
  return (
    <>
    <h1>login</h1>
    <MantineProvider theme={{
    }}
    styles={{
      Button: (theme) => ({
        root: {
          color: 'black',
          backgroundColor: theme.colors.yellow[4]
        }
      }) 
    }}
    >
    <Link href="/trabajador">
      <Button>Iniciar Sesión</Button>
    </Link>
    </MantineProvider>
    </>
  )
}


export default login
