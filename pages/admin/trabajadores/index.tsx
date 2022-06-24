import type { NextPage } from 'next'
import TrabajadorRow from '../../../components/TrabajadorRow';
import { Table, Text , Title, Space} from '@mantine/core'
import Head from 'next/head';
import AddTrabajador from '../../../components/AddTrabajador';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { PerfilData } from '../perfil';


export interface TrabajadorRowProps {
  dni: string;
  nombre: string;
  cargo: string;
  ultimo_acceso: string; 
  foto: string;
}

const ListaTrabajadores: NextPage = () => {
  const { requestAuthenticated } = useContext(AuthContext)
  const [elements, setTrabajador] = useState<TrabajadorRowProps[]>();
  //const [elements, setTrabajador] = useState<PerfilData[]>();


  /*const fetchDatos = () => {
    fetch('https://craaxkvm.epsevg.upc.es:23600/api/trabajador')
      .then(res => res.json())
      .then(data => {
        setTrabajador(data);
      });
  }*/
    const fetchDatos = async () => {
      const result = await requestAuthenticated('https://craaxkvm.epsevg.upc.es:23600/api/trabajador', {
        method:'GET'
      });
      const data = await result.json();
      setTrabajador(data);
    };
  useEffect(() => {
    fetchDatos();
  }, [])
  
  const { user, logout } = useContext(AuthContext);
  const [ profile, setProfile ] = useState<PerfilData>(user!)

  useEffect(() => {
    setProfile(user!)
  }, [user])

  return (
    <>
      <Head>
        <title>GeSyS - Trabajadores</title>
      </Head>
      <Title order={1}> <Text  inherit component="span">Trabajadores </Text></Title>
      <Space  h={25}/>         
      {(profile.cargo == "administrador" || profile.cargo == "jefe") && <AddTrabajador triggerReload={fetchDatos} />}     
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
          {elements && elements.map((element, index) => { //ver roles por niveles
            if (profile.cargo == "trabajador" && 
            element.cargo != "administrador" &&  
            element.cargo !=  "jefe")
            return <TrabajadorRow key={index} {...element}/>
          else if( profile.cargo == "responsable" || profile.cargo == "jefe" || profile.cargo == "administrador") 
              return <TrabajadorRow key={index} {...element}/>
          })}
          </tbody>
      </Table>
    </>
  )
}

export default ListaTrabajadores