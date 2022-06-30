import { ActionIcon, Autocomplete, Table, Box, Button, Center, Grid, Group, Modal, Popover, Space, Text } from "@mantine/core";
import { NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState} from "react";
import EditEstState from "../../../../components/EditEstState";
import { AuthContext } from "../../../../contexts/AuthContext";
import AveriaRow_mas from "../../../../components/AveriaRow_mas";



export interface AveriaRowProps {
    Est: string;
    id_averia: number;
    Date: Date | null; 
    State: string; 
    Desc: string;
    id_trabajador:number|null;
  }
const Estacion: NextPage = () => {
  const { requestAuthenticated } = useContext(AuthContext)

  const { query } = useRouter();
  const { estacion } = query;

  const cl: AveriaRowProps[]=[];
  //borrar
  const [elements, setAverias] = useState<AveriaRowProps[]>(cl);
  useEffect(() => {
    const fetchEstacion = async () => {
      const result = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/incidencias/byname/${estacion}`,"", {
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
          id_trabajador:data[i].id_trabajador,
        }
        averias.push(ave)
      }
      {averias.length>0 && setAverias(averias)}
    }
    fetchEstacion();
  }, [])
  return (
    <>
      <Head>
        <title>Gesys - Estación: {estacion}</title>
      </Head>
      <Text align="left" size="xl">Estación {estacion}</Text>

    <Table striped highlightOnHover>
        <thead>
            <tr>
            <th>id_averia</th>
            <th>Estacion</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>id_trabajador</th>

            </tr>
        </thead>
        <tbody>    
         
         {elements && elements.map((element, index) => {
             return <AveriaRow_mas key={index} averia={element}/>
         })}  
           
                  
     </tbody>

    </Table>

    </>
  )
}

export default Estacion;