import type { NextPage } from 'next'
import TrabajadorRow from '../../../components/TrabajadorRow';
import { Table, Text , Title, Space, Select, Grid, Input, InputWrapper, Autocomplete } from '@mantine/core'
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { PerfilData } from '../perfil';
import AddTrabajador from '../../../components/AddTrabajador';



export interface TrabajadorRowProps {
  dni: string;
  nombre: string;
  cargo: string;
  ultimo_acceso: string; 
  foto: string;
}

export interface Filter {
  name: string;
  value: string;
}

const allFilters: Filter[] = [
  {
    name:"Nombre",
    value: "Nombre"
  },
  {
    name:"DNI",
    value: "DNI"
  },
  {
    name:"Rol",
    value: "Rol"
  },

];

const ListaTrabajadores: NextPage = () => {
  const { requestAuthenticated } = useContext(AuthContext)

  const trabajador: TrabajadorRowProps[]=[];// creem un element buit inicial
  const [elements, setTrabajador] = useState<TrabajadorRowProps[]>(trabajador);

    const fetchDatos = async () => {
      const result = await requestAuthenticated('https://craaxkvm.epsevg.upc.es:23600/api/trabajador')
      const data = await result.json();
      setTrabajador(data);
    };
  useEffect(() => {
    fetchDatos();
  }, [])
  
  const handleDeleteClick = (dni: string) => {
    const tmp = [];
    for(let i = 0; i < elements.length; i++) {
      if (elements[i].dni != dni) {
        tmp.push(elements[i]);
      }
    }
    setTrabajador(tmp);
  }
  
  const { user, logout } = useContext(AuthContext);
  const [ profile, setProfile ] = useState<PerfilData>(user!)

  const [activeFilters, setActiveFilters] = useState<Filter[]>(allFilters);
  const [value, setValue] = useState('');  
  const [filtro, setFiltro] = useState('');

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

  return (
    <>
      <Head>
        <title>GeSyS - Trabajadores</title>
      </Head>
      <Title order={1}> <Text  inherit component="span">Trabajadores </Text></Title>
      <Space  h={25}/>         
      {(profile.cargo == "administrador" || profile.cargo == "jefe") && <AddTrabajador triggerReload={fetchDatos} />}     
      
      <Grid gutter="xl">
        <Grid.Col span={3}>
          <Autocomplete           
            label="Filtrar por..."
            placeholder="Selecciona un filtro"
            value={filtro}
            limit={7}
            onChange={setFiltro}
            data={activeFilters}
            onClick={() => setFiltro("")}  
            filter={(filtro, item) => item.value.toLowerCase().includes(value.toLowerCase().trim())}
            />
        </Grid.Col>
          {filtro == "" && value && setValue("")}

          { }
          {filtro=="Nombre" && <Grid.Col span={6}>        
          <Autocomplete
            label="Filtrar por nombre:"
            placeholder="Escribe un nombre para filtrar..."
            value={value} onChange={setValue} data={elements.map((item) => ({ ...item, value: item.nombre }))}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
        </Grid.Col>   
        }  

        { }
        {filtro=="DNI" && <Grid.Col span={6}>        
          <Autocomplete
            label="Filtrar por DNI:"
            placeholder="Escribe un DNI para filtrar..."
            value={value} onChange={setValue} data={elements.map((item) => ({ ...item, value: item.dni }))}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
        </Grid.Col>   
        }

        { }
        {filtro=="Rol" && <Grid.Col span={6}>        
          <Autocomplete
            label="Filtrar por Rol:"
            placeholder="Escribe un rol para filtrar..."
            value={value} onChange={setValue} data={elements.map((item) => ({ ...item, value: item.cargo }))}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
        </Grid.Col>   
        }
      </Grid>
        
      
      <Table striped highlightOnHover>
          <thead>
              <tr>
              <th>Foto</th>
              <th>Dni</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Ultimo Acceso</th>       
              </tr>       
          </thead>
          <tbody>
            {filtro == "" && elements && elements.map((element, index) => {
                return <TrabajadorRow key={index} trabajador={element}/>
            })}  
            {filtro == "Nombre" && elements && elements.filter(element => element.nombre.includes(value)).map((elementFiltrat, index) => {
                return <TrabajadorRow key={index} trabajador={elementFiltrat}/>
            })}  
            {filtro == "Rol" && elements && elements.filter(element => element.cargo.includes(value)).map((elementFiltrat, index) => {
                return <TrabajadorRow key={index} trabajador={elementFiltrat}/>
            })} 
            {filtro == "DNI" && elements && elements.filter(element => element.dni.includes(value)).map((elementFiltrat, index) => {
                return <TrabajadorRow key={index} trabajador={elementFiltrat}/>
            })}               
          </tbody>
      </Table>
    </>
  )
}

export default ListaTrabajadores