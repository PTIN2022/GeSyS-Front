import { Table, Title, Space, Text } from '@mantine/core';
import type { NextPage } from 'next'
import AveriaRow from '../../../components/AveriaRow';
import * as React from 'react'
import { useEffect, useState } from 'react';
import Incidencia_nueva from '../../../components/nueva_incidencia'
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

export interface AveriaRowProps {
  Est: string;
  id_averia: number;
  //Dir: string;
  Date: Date | null; 
  State: string; 
  Desc: string; 
  id_trabajador:null|string;
}

const ListaAverias: NextPage = () => {
  const { requestAuthenticated } = useContext(AuthContext)

  const cl: AveriaRowProps[]=[];
  //borrar
  const [elements, setAverias] = useState<AveriaRowProps[]>(cl);

  const handleDeleteClick = (id_averia: number) => {
    const tmp = [];
    for(let i = 0; i < elements.length; i++) {
      if (elements[i].id_averia != id_averia) {
        tmp.push(elements[i]);
      }
    }
    setAverias(tmp);
  }
  //borrar
  useEffect(() => {
    const fetchEstacion = async () => {
      const result = await requestAuthenticated('https://craaxkvm.epsevg.upc.es:23600/api/incidencias',"application/json", {
        method:'GET',
      });
      const data = await result.json();  
      console.log(data[0])
      const averias = []

      for(let i=0; i<data.length; i++) {
        let ave:AveriaRowProps = {
          id_averia:data[i].id_averia,
          Est: data[i].name_estacion,
          //Dir: data[i].direccion,
          Date: data[i].fecha, 
          State: data[i].estado,
          Desc: data[i].descripcion,
          id_trabajador:data[i].id_trabajador
        }
        averias.push(ave)
      }
      {averias.length>0 && setAverias(averias)}
    }
    fetchEstacion();
  }, [])
  
  return (
    <>
    <Title order={1}> <Text  inherit component="span">Averías </Text></Title>
    <Space  h={25}/>
    <Incidencia_nueva/>
    <Table striped highlightOnHover>
        <thead>
            <tr>
            <th>Estacion</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Descripción</th>
            </tr>
        </thead>
        <tbody>    
         
            {elements && elements.map((element, index) => {
                return <AveriaRow key={index} deleteElement={handleDeleteClick} averia={element}/>
            })}  
              
                     
        </tbody>
    </Table>

    </>
  )
}

export default ListaAverias