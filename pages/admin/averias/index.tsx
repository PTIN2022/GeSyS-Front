import { Table, Center } from '@mantine/core';
import type { NextPage } from 'next'
import Link from 'next/link'
import AveriaRow from '../../../components/AveriaRow';
import * as React from 'react'

const elements = [
    {Est: "VGA1", Dir: "Av. Victor Balaguer nº1",
    Date: '03/02/2022', State : "Resolt",
     Desc:'El cargador en la planta 2 plaza 1 no funciona '},
    { Est: "VGA2", Dir: "Rambla Exposició nº22",
     Date: '20/02/2022', State : 'No Resolt',
      Desc:'El cargador en la planta -1 plaza 3 no funciona '}, 
    { Est: "VGA1", Dir: "Av. Victor Balaguer nº1",
      Date: '30/03/2022', State : 'Resolt',
       Desc:'El cargador en la planta 3 plaza 5 no funciona '}
  ]; 

const ListaAverias: NextPage = () => {
  return (
    <>
    <h1>Averias</h1>
    <Link href="/">Home</Link>
    <Table striped highlightOnHover>
                <thead>
                    <tr>
                    <th>Estacion</th>
                    <th>Dirección</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {elements && elements.map((element, index) => {
                        return <AveriaRow {...element}/>
                    })}
                </tbody>
            </Table>

    </>
  )
}

export default ListaAverias