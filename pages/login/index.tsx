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
          backgroundColor: theme.colors.yellow[3],
          width: "240px",
          marginLeft: "760px",
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
    </>
  )
}


export default login
