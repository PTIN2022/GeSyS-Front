import { Autocomplete, Box, Button, Modal, NumberInput, Space, Text, TextInput } from '@mantine/core';
import { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { PerfilData, RolWorker } from '../perfil';
import InfoPerfil from '../../../components/InfoPerfil';
import { useRouter } from 'next/router';

export interface PerfilTrabajadorData {
  foto: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: string;
  cargo: RolWorker;
}

const PerfilTrabajador : NextPage = () => {
    const [opened, setOpened] = useState(false);
    const { requestAuthenticated } = useContext(AuthContext)
    const [Trabajador, setTrabajador] = useState<PerfilTrabajadorData>();
    const router = useRouter();
    const query = router.query;
    const dni = query.trabajador;
    console.log(dni)


     useEffect(() => {
       const fetchDatos = async () => {
        if (dni !== undefined){
         const result = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/trabajador/${dni}`)
         const data = await result.json();
         setTrabajador(data)
        }
       }
      fetchDatos()
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [dni])


    return(
      <>
          <InfoPerfil {...Trabajador!}/>
      </>
    )


  }
export default PerfilTrabajador;