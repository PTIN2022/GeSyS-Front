import { NextPage } from 'next';
import { Table, Space, Text, Title } from '@mantine/core';
import FilaSoporte from '../../../components/FilaTablaSoporte';
import { useEffect, useState } from 'react';

export interface SoporteRowProps {
	descripcion: string;
	estado: boolean;
	fecha: Date;
	ticket_id: number;
}

const SoporteTecnico : NextPage =() => {
  const [SoporteDataMock, setAverias] = useState<SoporteRowProps[]>();

  useEffect(() => {
    const fetchEstacion = async () => {
      const result = await fetch('http://craaxkvm.epsevg.upc.es:23601/api/soporte');
      const data = await result.json();  
  
      const est = []
  
      for(let i=0; i<data.length; i++) {
        let est1:SoporteRowProps = {
          descripcion: data[i].descripcion,
          estado: data[i].estado,
          fecha: data[i].fecha,
          ticket_id: data[i].ticket_id
        }
        est.push(est1)
      }
      setAverias(est);
    }
    fetchEstacion();
  }, [])

  return (
    <>
      <Title order={1}> <Text inherit component="span">Soporte Técnico </Text></Title>
      <Space h={25}/>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Problema</th>
            <th>Estado</th>
            <th>Fecha</th>
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