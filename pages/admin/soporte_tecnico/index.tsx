import { NextPage } from 'next';
import { Table } from '@mantine/core';
import FilaSoporte from '../../../components/FilaTablaSoporte';
import { SoporteRowProps } from '../../../interfaces';

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
      <h1>Soporte Técnico</h1>
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