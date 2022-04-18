import { Table } from '@mantine/core';
import type { NextPage } from 'next'
import AveriaRow from '../../../components/AveriaRow';
import * as React from 'react'
import { AveriaRowProps } from '../../../interfaces';

const elements: AveriaRowProps[] = [
  {
    Est: "VGA1",
    Dir: "Av. Victor Balaguer nº1",
    Date: '03/02/2022',
    State: "Resulta",
    Desc: 'El cargador en la planta 2 plaza 1 no funciona '
  },
  {
    Est: "VGA2",
    Dir: "Rambla Exposició nº22",
    Date: '20/02/2022',
    State: 'No Resuelta',
    Desc: 'El cargador en la planta -1 plaza 3 no funciona '
  },
  {
    Est: "VGA1",
    Dir: "Av. Victor Balaguer nº1",
    Date: '30/03/2022',
    State: 'Resuelta',
    Desc: 'El cargador en la planta 3 plaza 5 no funciona '
  }
];

const ListaAverias: NextPage = () => {
  return (
    <>
    <h1>Averias</h1>
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
                return <AveriaRow key={index} {...element}/>
            })}
        </tbody>
    </Table>

    </>
  )
}

export default ListaAverias