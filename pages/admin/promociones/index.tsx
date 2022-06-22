import { Table, Space, Title, Text } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import AddPromocion from '../../../components/AddPromocion';
import PromoRow from '../../../components/PromoRow';

export interface PromoData {
  id_promo: number;
  descuento: number;
  // id_estacion: number;
  fecha_inicio: Date | null;
  fecha_fin: Date | null;
  estado: boolean;
  descripcion: string;
  // cupones_max: number;
}

const ListaPromociones: NextPage =() => {

  const [promos, setPromos] = useState<PromoData[]>([]);

  const fetchDatos = () => {
    fetch('https://craaxkvm.epsevg.upc.es:23600/api/promociones')
      .then(res => res.json())
      .then(data => {
        setPromos(data);
      });
  }

  useEffect(() => {
    fetchDatos();
  }, [])

    return (
      <>
        <Head>
          <title>GeSyS - Promociones</title>
        </Head> 
        <Title order={1}> <Text  inherit component="span">Promociones </Text></Title>
        <Space  h={25}/>  
        <AddPromocion triggerReload={fetchDatos} />
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Id promocion</th>
              <th>Descuento [%]</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Estado</th>   
            </tr>       
          </thead>
          <tbody>
          {promos && promos.map((element, index) => {
            return <PromoRow key={index} {...element}/>
          })}
          </tbody>
        </Table>
      </> 
    )   
}


export default ListaPromociones