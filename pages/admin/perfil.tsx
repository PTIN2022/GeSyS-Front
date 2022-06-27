import { Image, Box, Group, TextInput, Tooltip, Button, Text, Grid } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AlertCircle, Phone, User, At, Id, IdBadge } from 'tabler-icons-react';
import { NextPage } from 'next';
import { AuthContext } from '../../contexts/AuthContext';
import InfoPerfil from '../../components/InfoPerfil';
//import Modificar_perfil from '../../components/Modificar_perfil';


export type RolWorker = "jefe" | "administrador" | "responsable" | "trabajador";

export interface PerfilData {
	apellido: string;
	cargo: RolWorker;
	dni: string;
	email: string;
	estado: string;
	foto: string;
	id_estacion: number;
	id_trabajador: number;
	id_usuari: number;
	nombre: string;
	question: string;
	telefono: string;
	token: string;
	type: string;
	ultimo_acceso: Date;
	username: string;
}

const PerfilInfo: NextPage = () => {

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
    ) :
    <>
    <InfoPerfil {...perfil} />

    {/* 
    ************************************
    AQUI HA DE IR EL BOTON 
    QUE TE PERMITA CAMBIAR LA CONTRASEÑA
    ************************************
   */}
    </>
    }
    </>
    );
  }

  export default PerfilInfo
 /* <Button onClick={() => setEditing(!editing)}>
  { editing ? 'Guardar Cambios' : 'Editar' }
</Button> */