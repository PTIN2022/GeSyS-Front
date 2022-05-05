import { NextPage } from 'next';
import { Table, Center, Title, Space, Text } from '@mantine/core';
import FilaEstacion from '../../../components/FilaTablaEstacion';

export interface EstacionRowProps {
  Est: string;
  Dir: string;
  Kwh: string; 
  Oc : string; 
  m2: number; 
  enc: string;
}

const EstacionesMockData: EstacionRowProps[] = [
  { 
    Est: "VGA1", 
    Dir: "Av. Victor Balaguer nº1",
    Kwh: '350/720', 
    Oc : '50/100', 
    m2: 3000, 
    enc:"Leandra de Borrell" 
  },
  { 
    Est: "VGA2", 
    Dir: "Rambla Exposició nº1",
    Kwh: '200/504', 
    Oc : '27/70', 
    m2: 1000, 
    enc:"Noé Roig Balaguer" 
  }
];
  
const ListaEstaciones: NextPage =() => {
  return (
    <>
      <Title order={1}> <Text  inherit component="span">Estaciones </Text></Title>
      <Space  h={25}/>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Estacion</th>
            <th>Dirección</th>
            <th>Kwh</th>
            <th>Ocupación</th>
            <th>Superficie m²</th>
            <th>Encargado</th>
          </tr>
        </thead>
        <tbody>
          {EstacionesMockData && EstacionesMockData.map((element, index) => {
              return <FilaEstacion key={index} {...element}/>
          })}
        </tbody>
      </Table>
    </>
    )   
  }

  export default ListaEstaciones