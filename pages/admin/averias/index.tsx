import { Table, Title, Space, Text } from '@mantine/core';
import type { NextPage } from 'next'
import AveriaRow from '../../../components/AveriaRow';
import * as React from 'react'
import { useEffect, useState } from 'react';

export interface AveriaRowProps {
  Est: string;
  Dir: string;
  Date: string; 
  State: string; 
  Desc: string; 
}

/*
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
]; */

const ListaAverias: NextPage = () => {
  
  const [elements, setAverias] = useState<AveriaRowProps[]>();

  useEffect(() => {
    const fetchEstacion = async () => {
      const result = await fetch('https://craaxkvm.epsevg.upc.es:23600/api/incidencias');
      const data = await result.json();  

      const est = []

      for(let i=0; i<data.length; i++) {
        let est1:AveriaRowProps = {
          Est: data[i].id_estacion,
          Dir: data[i].direccion,
          Date: data[i].fecha_averia, 
          State: data[i].estado, 
          Desc: data[i].descripcion,
        }
        est.push(est1)
      }
      setAverias(est);
    }
    fetchEstacion();
  }, [])
  return (
    <>
    <Title order={1}> <Text  inherit component="span">Averías </Text></Title>
    <Space  h={25}/>
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