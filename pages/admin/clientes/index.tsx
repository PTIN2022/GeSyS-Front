import type { NextPage } from 'next'
import Head from 'next/head';
import { useForm, formList } from '@mantine/form';
import { Table, useMantineTheme, Modal, TextInput, Switch, Group, ActionIcon, Box, Text, Button, Title, Space, Autocomplete, Grid } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { useEffect, useState } from 'react';
import ClientesRow from '../../../components/ClientesRow';
import AddCliente from '../../../components/AddCliente';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { Filter } from '../reservas';
import { PerfilData } from '../perfil';


export interface ClientesData {
  id : number;
  nombre: string;
  apellido: string;
  email: string;
  dni:string;
  telefono:number;
  username: string;
  saldo:number;
}
const allFilters: Filter[] = [
  {
    name:"Nombre",
    value: "Nombre"
  },
  {
    name:"Apellido",
    value: "Apellido"
  },
  {
    name:"DNI",
    value: "DNI"
  },
  {
    name:"Email",
    value: "Email"
  },

];

const ListaClientes: NextPage = () => {

  const [activeFilters, setActiveFilters] = useState<Filter[]>(allFilters);

  const { user, logout } = useContext(AuthContext);
  const [ profile, setProfile ] = useState<PerfilData>(user)
    //useEfect, cada vegada que user canvi de valor, que profile s'actualitzi
    useEffect(() => {
      setProfile(user!)
    }, [user])

    //useEfect, cada vegada que profile canvi de valor, que s'actualitzin els filtres
    useEffect(() => {
      if (profile.cargo.toLowerCase() == "trabajador") {
        const active = activeFilters.filter(element => {
          if (element.name.toLowerCase() !== 'ciudad' && element.name.toLowerCase() !== 'estación') {
            return element
          }
        })
        setActiveFilters(active);
      }
      else if( profile.cargo.toLowerCase() == "responsable"){
        const active = activeFilters.filter(element => {
          if (element.name.toLowerCase() !== 'ciudad') {
            return element
          }
        })
        setActiveFilters(active);
      }
      else {
        setActiveFilters(allFilters);
      }
    }, [profile])

  const { requestAuthenticated } = useContext(AuthContext)


  const cl: ClientesData[]=[];// creem un element buit inicial
  const [elements, setClientes] = useState<ClientesData[]>(cl);

  /*********************************** 
       FUNCIO PER ESBORRAR ELEMENT
  ************************************/
  const handleDeleteClick = (id: number) => {
    const tmp = [];
    for(let i = 0; i < elements.length; i++) {
      if (elements[i].id != id) {
        tmp.push(elements[i]);
      }
    }
    setClientes(tmp);
  }
  /************************************
         ACONSEGUIM LES DADES
  *********************************/
  useEffect(() => {
    const fetchCliente = async () => {
      const result = await requestAuthenticated('https://craaxkvm.epsevg.upc.es:23600/api/clientes', "", {
        method:'GET'
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
          saldo: data[i].saldo
        }
        clientes.push(cl1)
      }
      {clientes.length>0 && setClientes(clientes)}
    }
    fetchCliente();
  }, [])



  const [value, setValue] = useState('');  
  const [filtre, setFilter] = useState('');


  return (
    <>
    <Title order={1}> <Text  inherit component="span">Clientes </Text></Title>
    <Space  h={25}/>
    <AddCliente clientList={elements} addCliente={setClientes} />

    <Grid gutter="xl">
        <Grid.Col span={3}>
          <Autocomplete           
            label="Elige que filtrar"
            placeholder="Pick one"
            //data={data}
            value={filtre}
            limit={7}
            onChange={setFilter}
            data={activeFilters}
            onClick={() => setFilter("")}    
            filter={(filtre, item) => item.value.toLowerCase().includes(value.toLowerCase().trim())}
            />
        </Grid.Col>
        {filtre == "" && value && setValue("")}
        
        {/** FILTRO POR NOMBRE */}
        {filtre=="Nombre" && <Grid.Col span={6}>        
          <Autocomplete
            label="Elemento a filtrar:"
            placeholder="Pick one"
            //data={data}
            value={value} onChange={setValue} data={elements.map((item) => ({ ...item, value: item.nombre }))}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
        </Grid.Col>   
        }
      {/** FILTRO POR APELLIDO */}
      {filtre=="Apellido" && <Grid.Col span={6}>        
          <Autocomplete
            label="Elemento a filtrar:"
            placeholder="Pick one"
            //data={data}
            value={value} onChange={setValue} data={elements.map((item) => ({ ...item, value: item.apellido }))}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
        </Grid.Col>   
        }
        {/** FILTRO POR DNI */}
        {filtre=="DNI" && <Grid.Col span={6}>        
          <Autocomplete
            label="Elemento a filtrar:"
            placeholder="Pick one"
            //data={data}
            value={value} onChange={setValue} data={elements.map((item) => ({ ...item, value: item.dni }))}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
        </Grid.Col>   
        }
        {/** FILTRO POR EMAIL */}
        {filtre=="Email" && <Grid.Col span={6}>        
          <Autocomplete
            label="Elemento a filtrar:"
            placeholder="Pick one"
            //data={data}
            value={value} onChange={setValue} data={elements.map((item) => ({ ...item, value: item.email }))}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
        </Grid.Col>   
        }
      </Grid>
     <br></br>
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
         
            {filtre == "" && elements && elements.map((element, index) => {
                return <ClientesRow key={index} deleteElement={handleDeleteClick} cliente={element}/>
            })}  
            {filtre == "Nombre" && elements && elements.filter(element => element.nombre.includes(value)).map((elementFiltrat, index) => {
                return <ClientesRow key={index} deleteElement={handleDeleteClick} cliente={elementFiltrat}/>
            })}  
            {filtre == "Apellido" && elements && elements.filter(element => element.apellido.includes(value)).map((elementFiltrat, index) => {
                return <ClientesRow key={index} deleteElement={handleDeleteClick} cliente={elementFiltrat}/>
            })} 
            {filtre == "DNI" && elements && elements.filter(element => element.dni.includes(value)).map((elementFiltrat, index) => {
                return <ClientesRow key={index} deleteElement={handleDeleteClick} cliente={elementFiltrat}/>
            })}
            {filtre == "Email" && elements && elements.filter(element => element.email.includes(value)).map((elementFiltrat, index) => {
                return <ClientesRow key={index} deleteElement={handleDeleteClick} cliente={elementFiltrat}/>
            })}          
        </tbody>
    </Table>

    </>
  )
}

export default ListaClientes

