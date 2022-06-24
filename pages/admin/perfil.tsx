import { Image, Box, Group, TextInput, Tooltip, Button, Text, Grid } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AlertCircle, Phone, User, At, Id, IdBadge } from 'tabler-icons-react';
import { NextPage } from 'next';
import { AuthContext } from '../../contexts/AuthContext';
import InfoPerfil from '../../components/InfoPerfil';
//import Modificar_perfil from '../../components/Modificar_perfil';


export type RolWorker = "jefe" | "administrador" | "responsable" | "trabajador";

export interface PerfilData {
  token: string;
  username: string;
  pfp: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: string;
  cargo: RolWorker;
  question: string;
  estacion: string;
  estado: boolean;
}

const PerfilInfo: NextPage = () => {

  const [elements, setTrabajador] = useState<PerfilData[]>();
  /*const fetchDatos = async () => {
    const result = await fetch('https://craaxkvm.epsevg.upc.es:23600/api/trabajador');
    const data = await result.json();  

    const est = []

    for(let i=0; i<data.length; i++) {
      let est1:PerfilData = {
        pfp: data[i].picture,
        nombre: data[i].name,
        apellido: data[i].lastname,
        telefono: data[i].telf,
        email: data[i].email,
        dni: data[i].dni,
        cargo: data[i].rol,
        passw: data[i].passw,
        Last_access: data[i].last_access,
      }
      est.push(est1)
    }
    setTrabajador(est);
  };
useEffect(() => {
  fetchDatos();
}, [])*/

  const [editing, setEditing] = useState<boolean>(false);

  const { user } = useContext(AuthContext);
  const [ perfil, setPerfil ] = useState<PerfilData>(user!);

  useEffect(() => {
    setPerfil(user!);
  }, [user])

  const rightSection = (
    <Tooltip label="Contacta con un administrador para editar este campo" position="top" placement="end" color="ccdde8">
      <AlertCircle size={16} style={{ display: 'block', opacity: 0.5 }} />
    </Tooltip>
  );
  
  return (
    <>
    {!perfil ? (
      <div>
        Loading...
      </div>
    ) : <InfoPerfil {...perfil} />
    }
    </>
    );
  }

  export default PerfilInfo
 /* <Button onClick={() => setEditing(!editing)}>
  { editing ? 'Guardar Cambios' : 'Editar' }
</Button> */