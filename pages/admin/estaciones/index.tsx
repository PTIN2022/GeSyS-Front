import { NextPage } from 'next';
import { Table, Center, Title, Space, Text } from '@mantine/core';
import FilaEstacion from '../../../components/FilaTablaEstacion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export interface EstacionRowProps {
  Est: string;
  Dir: string;
  Kwh: string; 
  Oc : string; 
  m2: number; 
  enc: string;
}
  
const ListaEstaciones: NextPage =() => {
  
  const [estaciones, setEstaciones] = useState<EstacionRowProps[]>();

  useEffect(() => {
    const fetchEstacion = async () => {
      const result = await fetch('http://craaxkvm.epsevg.upc.es:23601/api/estaciones');
      const data = await result.json();  

      const est = []

      for(let i=0; i<data.length; i++) {
        let est1:EstacionRowProps = {
          Est: data[i].id_estacion,
          Dir: data[i].direccion,
          Kwh: data[i].kwh_now+"/"+data[i].kwh_max,
          Oc: data[i].ocupation_now+"/"+data[i].ocupation_max,
          m2: data[i].surface_in_meters,
          enc: data[i].boss,
        }
        est.push(est1)
      }
      setEstaciones(est);
    }
    fetchEstacion();
  }, [])

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
          {estaciones && estaciones.map((element, index) => {
            return <FilaEstacion key={index} {...element}/>
          })}
        </tbody>
      </Table>
    </>
    )   
  }

  export default ListaEstaciones