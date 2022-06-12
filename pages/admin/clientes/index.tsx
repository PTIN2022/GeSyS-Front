import type { NextPage } from 'next'
import Head from 'next/head';
import { useForm, formList } from '@mantine/form';
import { Table, useMantineTheme, Modal, TextInput, Switch, Group, ActionIcon, Box, Text, Button, Title, Space } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { useEffect, useState } from 'react';
import ClientesRow from '../../../components/ClientesRow';
import AddCliente from '../../../components/AddCliente';

export interface ClientesData {
  id : number;
  nombre: string;
  apellido: string;
  email: string;
  dni:string;
  telefono:number;
  username: string;
}


const ListaClientes: NextPage = () => {
  
  const [elements, setClientes] = useState<ClientesData[]>();

  useEffect(() => {
    const fetchCliente = async () => {
      const result = await fetch('https://craaxkvm.epsevg.upc.es:23600/api/clientes', {
        method:'GET',
        headers:{
          'accept': 'application/json'
        },
       //mode:'no-cors'
      });
      const data = await result.json();  
      console.log(data[0])
      const clientes = []

      for(let i=0; i<data.length; i++) {
        let cl1:ClientesData = {
          id: data[i].id_usuari,
          nombre: data[i].nombre.toString(),
          apellido: data[i].apellido,
          email: data[i].email,
          dni: data[i].dni,
          telefono: data[i].telefono,
          username: data[i].username,
        }
        clientes.push(cl1)
      }
      {clientes.length>0 && setClientes(clientes)}
    }
    fetchCliente();
  }, [])
  return (
    <>
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
            </tr>
        </thead>
        <tbody>    
         
            {elements && elements.map((element, index) => {
                return <ClientesRow key={index} cliente={element}/>
            })}  
              
                     
        </tbody>
    </Table>

    </>
  )
}

export default ListaClientes