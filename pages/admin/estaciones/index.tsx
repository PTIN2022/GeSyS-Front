import { NextPage } from 'next';
import { Table, Center, Title, Space, Text } from '@mantine/core';
import FilaEstacion from '../../../components/FilaTablaEstacion';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../../contexts/AuthContext';

export interface EstacionRowProps {
  id : number;
  Est: string;
  Dir: string;
  Kwh: string; 
  Oc : string; 
  m2: number; 
  enc: string;
  state: string;
}
export const EstState=['Activa','Inactiva',"Dañada"];

const ListaEstaciones: NextPage =() => {
  const { requestAuthenticated } = useContext(AuthContext)

  const es: EstacionRowProps[]=[];
  const [estaciones, setEstaciones] = useState<EstacionRowProps[]>(es);

  useEffect(() => {
    const fetchEstacion = async () => {
      const result = await requestAuthenticated ('https://craaxkvm.epsevg.upc.es:23600/api/estaciones')
      const data = await result.json();  

      const est = []

      for(let i=0; i<data.length; i++) {
        const r=Math.floor(Math.random() * 3);
        console.log(data[i])
        let est1:EstacionRowProps = {
          id : data[i].id_estacion,
          Est: data[i].nombre_est,
          Dir: data[i].direccion,
          Kwh: data[i].potencia_usada+"/"+data[i].potencia_contratada,
          Oc: data[i].ocupation_actual+"/32",
          m2: Math.floor(Math.random()*(151) + 100),    //data[i].surface_in_meters,
          enc: data[i].telefono,
          state: data[i].estado,
        }
        est.push(est1)
      }
      {est.length>0 && setEstaciones(est)};
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
            <th>Estado</th>
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