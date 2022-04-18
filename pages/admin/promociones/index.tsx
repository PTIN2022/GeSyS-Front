import { Table } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import PromoRow from '../../../components/PromoRow';
import { PromoRowProps } from '../../../interfaces';


const elements: PromoRowProps[] = [
  {
    Est: "VG1",
    Descuento: "30%",
    Cupones: "50/100",
    Fecha_ini: "2022-03-18",
    Fecha_fin: "2022-05-22",
    Estado: "Activado"
  },
  {
    Est: "VG2",
    Descuento: "15%",
    Cupones: "27/-",
    Fecha_ini: "2022-03-20",
    Fecha_fin: "2022-06-20",
    Estado: 'Activado'
  },
  {
    Est: "VG1",
    Descuento: "50%",
    Cupones: "2/10",
    Fecha_ini: "2022-03-18",
    Fecha_fin: "2022-04-18",
    Estado: "Desactivado"
  }
];


const ListaPromociones: NextPage =() => {
    return (
      <>
        <Head>
          <title>GeSyS - Promociones</title>
        </Head> 
          <h1>Promociones</h1>   
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Estación</th>
              <th>Descuento</th>
              <th>Cupones Usados</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Estado</th>          
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