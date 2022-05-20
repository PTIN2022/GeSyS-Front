import { NextPage } from 'next';
import { Table, Space, Text, Title } from '@mantine/core';
import FilaSoporte from '../../../components/FilaTablaSoporte';
import { useEffect, useState } from 'react';

export interface SoporteRowProps {
  Name: string;
  Problema: string;
  Date: string; 
}
/*
const SoporteDataMock: SoporteRowProps[] = [
  {
    Name: "Cloe Bermudez",
    Problema: "Problema con aplicación mobil",
    Date: "11:35"
  },
  {
    Name: "Bernarda Estrella",
    Problema: "Creado esquema y mas texto para ver coomo queda, para vosotros aficion... siuu",
    Date: "22-03-22"
  },
  {
    Name: "Cloe Bermudez",
    Problema: "Problema con aplicación mobil",
    Date: "11:35"
  },
  {
    Name: "Cloe Bermudez",
    Problema: "Problema con aplicación mobil",
    Date: "11:35"
  }
];*/

const SoporteTecnico : NextPage =() => {
  const [SoporteDataMock, setAverias] = useState<SoporteRowProps[]>();

  useEffect(() => {
    const fetchEstacion = async () => {
      const result = await fetch('https://craaxkvm.epsevg.upc.es:23600/api/soporte');
      const data = await result.json();  

      const est = []

      for(let i=0; i<data.length; i++) {
        let est1:SoporteRowProps = {
          Name:  data[i].ticket_id,
          Problema:  data[i].descripcion,
          Date:  data[i].fecha,  
        }
        est.push(est1)
      }
      setAverias(est);
    }
    fetchEstacion();
  }, [])
  return (
    <>
      <Title order={1}> <Text  inherit component="span">Soporte Técnico </Text></Title>
      <Space  h={25}/>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Problema</th>
            <th>Fecha</th>
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