import { Table } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import AddPromocion from '../../../components/AddPromocion';
import AddReserva from '../../../components/AddReservas';
import PromoRow from '../../../components/PromoRow';
import { PromoRowProps } from '../../../interfaces';

const ListaReservas: NextPage =() => {
    return (
      <>
        <Head>
          <title>GeSyS - Reservas</title>
        </Head> 
        <h1>Reservas</h1>   
        <AddReserva />
      </> 
    )   
}


export default ListaReservas