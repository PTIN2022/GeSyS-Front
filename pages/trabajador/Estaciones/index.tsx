import type { NextPage } from 'next'
import { Button, MantineProvider, MantineTheme } from '@mantine/core'
import Link from 'next/link'

import type { NextPage } from 'next'

const Estaciones: NextPage = () => {
  return (
    <>
      <h1>
      Estaciones
      <MantineProvider theme={{
      }}
      styles={{
          Button: (theme) => ({
          root: {
              border:'black',
              color: 'black',
              backgroundColor: theme.colors.yellow[3],
              borderRadius:"10px",
              marginLeft: "1400px",
          }
          }) 
      }}
      >
      <Link href="/login">
          <Button variant="subtle" color="yellow">Cerrar Sesión</Button>
      </Link>
      </MantineProvider>
      </h1>
        <MantineProvider theme={{
        }}
        styles={{
            Button: (theme) => ({
            root: {
                border:'black',
                color: 'black',
                backgroundColor: theme.colors.blue[3],
                width: "150px",
                borderRadius:"0px"

            }
            }) 
        }}
        >
        <Link href="/trabajador">
            <Button variant="subtle" color="blue">Volver</Button>
        </Link>
        </MantineProvider>
    </>

  )
}

export default Estaciones
