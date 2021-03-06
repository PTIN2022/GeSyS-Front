import { Table, Space, Title, Text, Button, Grid, Group } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Temperature } from 'tabler-icons-react';
import AddPromocion from '../../../components/AddPromocion';
import PromoRow from '../../../components/PromoRow';
import { AuthContext } from '../../../contexts/AuthContext';

export interface PromoData {
  cantidad_usados: number;
  descripcion: string;
  descuento: number;
  fecha_fin: Date | null;
  fecha_inicio: Date | null;
  id_promo: number;
  id_estacion: number | undefined;
}

interface EstacionResponse {
  Estacion: number[]
}

const ListaPromociones: NextPage =() => {
  const [promos, setPromos] = useState<PromoData[]>([]);
  const [activar, setactivar] = useState<boolean>(true);
  const [activacion, setactivacio] = useState<string>("inactiva");
  const { requestAuthenticated } = useContext(AuthContext)
  
  const fetchDatos = async () => {
    
    setPromos([])
    const response = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/promociones/estado/${activacion}`)
    const datos = await response.json() as PromoData[][]
    
    datos.map(async (element: PromoData[]) => {
      return element.map(async (promo: PromoData) => {
        const result = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/promociones/${promo.id_promo}/estacion/${activacion}`);
        const datos_promo_estacion = await result.json() as EstacionResponse;
        
        datos_promo_estacion.Estacion?.map((promo_estacion_id: number) => {
          const tmp2 = {
            ...promo,
            id_estacion: promo_estacion_id
          } as PromoData
          setPromos(old => [...old, tmp2])
        })

      })
    })
  }

  useEffect(() => {
    fetchDatos();
  }, [activar])

  const activa_promo =()=>{
    setactivar(!activar)
    { activar ? setactivacio("activa") : setactivacio("inactiva") }
  }
    return (
      <>
        <Head>
          <title>GeSyS - Promociones</title>
        </Head> 
        <Title order={1}> <Text  inherit component="span">Promociones </Text></Title>
        <Group>
          <Grid>
            <Grid.Col span={8}>
                  <Text align="left" size="xl"> Mostradas:  </Text>
                  { activar ? 
                  <Text align="left" size="md"> Inactivas  </Text> 
                  :
                   <Text align="left" size="md"> Activas  </Text> 
                  }
            </Grid.Col>
          </Grid>
          <Space  h={25}/>  
          <AddPromocion triggerReload={fetchDatos} />
          <Space  h={15}/>
          <Button onClick={() => activa_promo()}>
              { activar ? 'Mostrar Activas' : 'Mostrar Inactivas' }
          </Button>
        </Group>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Id promocion</th>
              <th>Id estacion</th>
              <th>Descuento [%]</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
            </tr>       
          </thead>
          <tbody>
          {promos && promos.map((element, index) => {
            return <PromoRow key={index} promo={element} triggerReload={fetchDatos} activa={activar}/>
          })}
          </tbody>
        </Table>
      </> 
    )   
}


export default ListaPromociones