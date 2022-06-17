import type { NextPage } from 'next'
import TrabajadorRow from '../../../components/TrabajadorRow';
import { Table, Text , Title, Space} from '@mantine/core'
import Head from 'next/head';
import AddTrabajador from '../../../components/AddTrabajador';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { PerfilData } from '../perfil';


export interface TrabajadorRowProps {
  Dni: string;
  Name: string;
  Rol: string;
  Last_access: string; 
  Foto: string;
}

const ListaTrabajadores: NextPage = () => {
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
      const result = await fetch('https://craaxkvm.epsevg.upc.es:23600/api/trabajador');
      const data = await result.json();  

      const est = []

      for(let i=0; i<data.length; i++) {
        let est1:TrabajadorRowProps = {
          Dni: data[i].dni,
          Name: data[i].nombre+" "+data[i].apellido,
          Rol: data[i].cargo, 
          Last_access: data[i].ultimo_acceso,
          Foto: data[i].picture,
        }
        est.push(est1)
      }
      setTrabajador(est);
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
      {(profile.cargo == "Administrador" || profile.cargo == "Jefe") && <AddTrabajador triggerReload={fetchDatos} />}     
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
            if (profile.cargo == "Trabajador" && 
            element.Rol != "Administrador" &&  
            element.Rol !=  "Jefe")
            return <TrabajadorRow key={index} {...element}/>
          else if( profile.cargo == "Responsable" || profile.cargo == "Jefe" || profile.cargo == "Administrador") 
              return <TrabajadorRow key={index} {...element}/>
          })}
          </tbody>
      </Table>
    </>
  )
}

export default ListaTrabajadores