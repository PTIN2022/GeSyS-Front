import { NextPage } from 'next';
import { Table, Space, Text, Title } from '@mantine/core';
import FilaSoporte from '../../../components/FilaTablaSoporte';
import { useEffect, useState } from 'react';

export interface SoporteRowProps {
	id_ticket: number;
  asunto: string;
	estado: boolean;
	fecha: Date;
	id_cliente: string;
}

const SoporteTecnico : NextPage =() => {
  const [SoporteDataMock, setAverias] = useState<SoporteRowProps[]>();

  useEffect(() => {
    const fetchEstacion = async () => {
      const result = await fetch('http://craaxkvm.epsevg.upc.es:23601/api/soporte');
      const data = (await result.json() as SoporteRowProps[]).map(element => {
        return {
          ...element,
          fecha: new Date(element.fecha)
        }
      });
      setAverias(data);
    }
    fetchEstacion();
  }, [])

  return (
    <>
      <Title order={1}><Text inherit component="span">Soporte Técnico</Text></Title>
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
          {SoporteDataMock && SoporteDataMock.map((element, index) => {
            return <FilaSoporte key={index} {...element}/>
          })}
        </tbody>
      </Table>
    </>
  )   
}
export default SoporteTecnico