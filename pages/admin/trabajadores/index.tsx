import type { NextPage } from 'next'
import TrabajadorRow from '../../../components/TrabajadorRow';
import { Table, Text , Title, Space} from '@mantine/core'
import Head from 'next/head';
import AddTrabajador from '../../../components/AddTrabajador';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { PerfilData } from '../perfil';

export interface TrabajadorRowProps {
  Name: string;
  Rol: string;
  Last_access: string; 
  Foto: string;
}
/*
const elements: TrabajadorRowProps[] = [
  {
    Name: "Sergio Sanchez",
    Rol: "Jefe",
    Last_access: 'Connected',
    Foto: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg"
  },
  {
    Name: "Alfredo Manresa",
    Rol: "Administrador",
    Last_access: '30m',
    Foto: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
  },
  {
    Name: "Marc Capdevila",
    Rol: "Responsable",
    Last_access: '1h',
    Foto: "https://dp.profilepics.in/profile_pictures/cristiano-ronaldo/cristiano-ronaldo-dp-profile-pics-for-whatsapp-facebook-51.jpg"
  },
  {
    Name: "Eduardo Pinto",
    Rol: "Trabajador",
    Last_access: 'Connected',
    Foto: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_2.jpg"
  }
];*/


const ListaTrabajadores: NextPage = () => {
  
  const { user, logout } = useContext(AuthContext);
  const [ profile, setProfile ] = useState<PerfilData>(user!)

  useEffect(() => {
    setProfile(user!)
  }, [user])

  const [elements, setAverias] = useState<TrabajadorRowProps[]>();

  useEffect(() => {
    const fetchEstacion = async () => {
      const result = await fetch('https://craaxkvm.epsevg.upc.es:23600/api/trabajador');
      const data = await result.json();  

      const est = []

      for(let i=0; i<data.length; i++) {
        let est1:TrabajadorRowProps = {
          Name: data[i].name+" "+data[i].lastname,
          Rol: data[i].rol,
          Last_access: data[i].last_access,
          Foto: data[i].picture,   
        }
        est.push(est1)
      }
      setAverias(est);
    }
    fetchEstacion();
  }, [])
  return (
    <>
      <Head>
        <title>GeSyS - Trabajadores</title>
      </Head>
      <Title order={1}> <Text  inherit component="span">Trabajadores </Text></Title>
      <Space  h={25}/>         
      {(profile.cargo == "Administrador" || profile.cargo == "Jefe") && <AddTrabajador/>}      
      <Table striped highlightOnHover>
          <thead>
              <tr>
              <th>Foto</th>
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