import { NextPage } from 'next';
import { Table, Space, Text, Title, Select, Group } from '@mantine/core';
import FilaSoporte from '../../../components/FilaTablaSoporte';
import { useEffect, useState } from 'react';


export const estadosTicket = ['Resuelto', 'No resuelto', 'En curso', 'Pendiente']

export interface SoporteRowProps {
	id_ticket: number;
  asunto: string;
	estado: string;
	fecha: Date;
	id_cliente: string;
}

const SoporteTecnico : NextPage =() => {

  const [soporteDatos, setSoporteDatos] = useState<SoporteRowProps[]>();


  const [datosfiltados, setDatosFiltrados] = useState<SoporteRowProps[]>();
  const [filtrarEstado, setFiltrarEstado] = useState<string>('Todos')

  useEffect(() => {
    const fetchEstacion = async () => {
      const result = await fetch('http://craaxkvm.epsevg.upc.es:23601/api/soporte');
      const data = (await result.json() as SoporteRowProps[]).map(element => {
        return {
          ...element,
          fecha: new Date(element.fecha)
        }
      });
      setSoporteDatos(data);
    }
    fetchEstacion();
  }, [])

  useEffect(() => {

    if (filtrarEstado == 'Todos') {
      return setDatosFiltrados([])
    }

    const datos = soporteDatos?.filter(element => element.estado == filtrarEstado)
    setDatosFiltrados(datos)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtrarEstado])

  const renderFilterOrNot = () => {
    if (filtrarEstado == 'Todos') {
      return soporteDatos?.map((element, index) => {
        return <FilaSoporte key={index} {...element}/>
      })
    } else {
      return datosfiltados?.map((element, index) => {
        return <FilaSoporte key={index} {...element}/>
      })
    }

  }

  return (
    <>
      <Title order={1}><Text inherit component="span">Soporte Técnico</Text></Title>
      <Space h={25}/>
      <Group>
        <h2>Filtrar por estado:</h2>
        <Select placeholder='Filtro' data={['Todos', ...estadosTicket]} value={filtrarEstado} onChange={(val: string) => setFiltrarEstado(val)} />
      </Group>
      <Space h={25}/>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Asunto</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Client ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderFilterOrNot()}
        </tbody>
      </Table>
    </>
  )   
}
export default SoporteTecnico