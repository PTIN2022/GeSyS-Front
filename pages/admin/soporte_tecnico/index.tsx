import { NextPage } from 'next';
import { Table, Space, Text, Title } from '@mantine/core';
import FilaSoporte from '../../../components/FilaTablaSoporte';

export interface SoporteRowProps {
  Name: string;
  Problema: string;
  Date: string; 
}

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
];

const SoporteTecnico : NextPage =() => {
  return (
    <>
      <Title order={1}> <Text  inherit component="span">Soporte Técnico </Text></Title>
      <Space  h={25}/>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Nombre</th>
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