import { Table } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import AddPromocion from '../../../components/AddPromocion';
import PromoRow from '../../../components/PromoRow';

export interface PromoRowProps {
  Est: string;
  Descuento: string;
  Cupones: string; 
  Fecha_ini: string; 
  Fecha_fin: string; 
}

const elements: PromoRowProps[] = [
  {
    Est: "VG1",
    Descuento: "30%",
    Cupones: '50/100',
    Fecha_ini: "18/03/22",
    Fecha_fin: '20/03/22'
  },
  {
    Est: "VG2",
    Descuento: "15%",
    Cupones: '27/-',
    Fecha_ini: "20/03/22",
    Fecha_fin: '25/03/22'
  },
  {
    Est: "VG1",
    Descuento: "50%",
    Cupones: '2/10',
    Fecha_ini: "21/03/22",
    Fecha_fin: '22/03/22'
  }
];


const ListaPromociones: NextPage =() => {
    return (
      <>
        <Head>
          <title>GeSyS - Promociones</title>
        </Head> 
        <h1>Promociones</h1>   
        <AddPromocion />
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Estación</th>
              <th>Descuento</th>
              <th>Cupones Usados</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>         
            </tr>       
          </thead>
          <tbody>
          {elements && elements.map((element, index) => {
            return <PromoRow key={index} {...element}/>
          })}
          </tbody>
        </Table>
      </> 
    )   
}


export default ListaPromociones