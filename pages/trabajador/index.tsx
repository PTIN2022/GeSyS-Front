
import type { NextPage } from 'next'
import { Button, MantineProvider, MantineTheme } from '@mantine/core'
import Link from 'next/link'

const trabajador: NextPage = () => {
  return (
    <>

    <h1>
        Página trabajador
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
        <Link href="/trabajador/Averias">
            <Button variant="subtle" color="blue">Averias</Button>
        </Link>
        </MantineProvider>
        <br></br>
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
        <Link href="/trabajador/Estaciones">
            <Button variant="subtle" color="blue">Estaciones</Button>
        </Link>
        </MantineProvider>
    </>
  )
}


export default trabajador