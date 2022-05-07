import { Table} from '@mantine/core';
import type { NextPage } from 'next'
import AveriaRow from '../../../components/AveriaRow';
import * as React from 'react'
import { useState } from 'react';
import { Popover, Badge, Text} from '@mantine/core';
export interface AveriaRowProps {
  Est: string;
  Dir: string;
  Date: string; 
  State: string; 
  Desc: string; 
}

const elements: AveriaRowProps[] = [
  {
    Est: "VGA1",
    Dir: "Av. Victor Balaguer nº1",
    Date: '03/02/2022',
    State: "Resolt",
    Desc: 'El cargador en la planta 2 plaza 1 no funciona '
  },
  {
    Est: "VGA2",
    Dir: "Rambla Exposició nº22",
    Date: '20/02/2022',
    State: 'No Resolt',
    Desc: 'El cargador en la planta -1 plaza 3 no funciona '
  },
  {
    Est: "VGA1",
    Dir: "Av. Victor Balaguer nº1",
    Date: '30/03/2022',
    State: 'Resolt',
    Desc: 'El cargador en la planta 3 plaza 5 no funciona '
  }
];

const ListaAverias: NextPage = () => {
  const [opened, setOpened] = useState(false);
  return (
    <>
    <h1>Averias 
      <Text align="right">
        <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          position="right"
          placement="center"
          withArrow
          trapFocus={false}
          closeOnEscape={false}
          transition="pop-top-left"
          width={260}
          styles={{ body: { pointerEvents: 'none' } }}
          target={
            <Badge color='indigo' size='xs' onMouseEnter={() => setOpened(true)} onMouseLeave={() => setOpened(false)}>
              ayuda?
            </Badge>
          }>
          <div style={{ display: 'flex' }}>
            <Text size="xs">Contacte con el servicio técnico: +34 645 789 465</Text>
          </div>
        </Popover>
      </Text>
    </h1>

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