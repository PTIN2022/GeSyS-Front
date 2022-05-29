import type { NextPage } from 'next'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ClienteRow from '../../../components/ClienteRow';
import { useForm, formList } from '@mantine/form';
import { Table, useMantineTheme, Modal, TextInput, Switch, Group, ActionIcon, Box, Text, Button, Title, Space } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import AddCliente from '../../../components/AddCliente';
export interface clientData {
  apellido: string;
  dni: string;
  email: string;
  foto?: string;
  nombre: string;
  telefono: string;
  username: string;
}

const ListaClientes: NextPage =() => {

  const [clientes, setClientes] = useState<clientData[]>([]);

  const fetchDatos = () => {
    fetch('http://craaxkvm.epsevg.upc.es:23601/api/clientes')
      .then(res => res.json())
      .then(data => {
        setClientes(data);
      });
  }

  useEffect(() => {
    fetchDatos();
  }, [])

    return (
      <>
        <Head>
          <title>GeSyS - Clientes </title>
        </Head> 
        <Title order={1}> <Text  inherit component="span">Clientes </Text></Title>
        <Space  h={25}/>  
        <AddCliente/>
        <Table striped highlightOnHover>
          <thead>
            <tr>              
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Email</th>
              <th>Username</th>   
              <th>Telefono</th>  
            </tr>       
          </thead>
          <tbody>
          {clientes && clientes.map((element, index) => {
            return <ClienteRow key={index} {...element}/>
          })}
          </tbody>
        </Table>
      </> 
    )   
}


export default ListaClientes