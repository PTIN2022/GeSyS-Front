import { ActionIcon, Autocomplete, Table, Box, Button, Center, Grid, Group, Modal, Popover, Space, Text, TextInput, Textarea } from "@mantine/core";
import { NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState} from "react";
import EditEstState from "../../../../components/EditEstState";
import { AuthContext } from "../../../../contexts/AuthContext";
import AveriaRow_mas from "../../../../components/AveriaRow_mas";



export interface AveriaData {
    descripcion: string,
    estado: string,
    fecha: Date | null,
    id_averia: number,
    id_trabajador: number,
    name_estacion: string
  }  
const Averia: NextPage = () => {
  const { requestAuthenticated } = useContext(AuthContext)

  const { query } = useRouter();
  const id = query.averia;



  const [element, setAverias] = useState<AveriaData>();

  useEffect(() => {
    const fetchEstacion = async () => {
      const result = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/incidencias/${id}`)
      const data = await result.json(); 
      if(result.status == 200){
        setAverias(data) 
      }     
    }
    fetchEstacion();
  }, [id])

  return (
    <>
    <Head>
        <title>Gesys - Averia: {id}</title>
    </Head>
    <Text align="left" size="xl">Averia {id}</Text>
    <Space h={15}/>
    <Grid>
        <Grid.Col span={8}>
                <Text align="left" size="xl"> Informacion de la averia numero: {id}  </Text>
                <Text align="left" size="sm">Consulta la informacion de la averia a continuacion...  </Text>
        </Grid.Col>
    </Grid>
    <Group mt="lg">
  
    <TextInput size="md"
      label="ID Averia"
      value={element?.id_averia} 
      readOnly
    />

    <TextInput size="md"
      label="Estado"
      value={element?.estado}
      readOnly
    />  
  </Group>

  <Group mt="lg">
  
  <TextInput size="md"
    label="Estacion"
    value={element?.name_estacion}
    readOnly
  />

  <TextInput size="md"
    label="Trabajador"
    value={element?.id_trabajador}
    readOnly
  />
</Group> 
<Textarea readOnly={true} value={element?.descripcion}
          label="Descripción"      
          minRows={4}
          maxRows={6}     
          />   

    </>
  )
}

export default Averia ;