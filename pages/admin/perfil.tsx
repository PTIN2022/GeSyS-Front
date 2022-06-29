import { Image, Box, Group, TextInput, Tooltip, Button, Text, Grid, PasswordInput, Modal } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AlertCircle, Phone, User, At, Id, IdBadge } from 'tabler-icons-react';
import { NextPage } from 'next';
import { AuthContext } from '../../contexts/AuthContext';
import InfoPerfil from '../../components/InfoPerfil';
import { Notification } from '@mantine/core';
import { Check, X } from 'tabler-icons-react';
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

  const [opened, setOpened] = useState(false);

  const [newPassword, setNewPassword] = useState<string>('')
  const [conPassword, setConPassword] = useState<string>('')

  const { requestAuthenticatedForm } = useContext(AuthContext)

  useEffect(() => {
    setPerfil(user!);
  }, [user])

  const rightSection = (
    <Tooltip label="Contacta con un administrador para editar este campo" position="top" placement="end" color="ccdde8">
      <AlertCircle size={16} style={{ display: 'block', opacity: 0.5 }} />
    </Tooltip>
  );
  
  const PasswordChange = async () => {
    
    if (newPassword.length < 8)
      alert('La contraseña debe tener un mínimo de 8 carácteres')

    else{
      if (newPassword != conPassword)
        alert('Las contraseñas no coinciden')
      
      else{
         const form = new FormData()
         form.append('password',newPassword);

        const fetchData = async () => {
          const request = await requestAuthenticatedForm(`https://craaxkvm.epsevg.upc.es:23600/api/trabajador/${perfil.dni}`,"PUT",form)
          request.onload = function() {
            if (request.status != 200) { // analyze HTTP status of the response
              alert(`Error ${request.status}: ${request.statusText}`); // e.g. 404: Not Found
            }
          }
        }
        setOpened(false)
        fetchData()
      } 
    }
  }
  
  return (
    <>
    {!perfil ? (
      <div>
        Loading...
      </div>
    ) :
    <>
    <InfoPerfil {...perfil} />

    {
      <>
      <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              title="Cambiar contraseña"
            >

            <PasswordInput
              placeholder="Nueva contraseña"
              label="Nueva contraseña"
              description="La contraseña debe tener un mínimo de 8 carácteres"
              required
              //error="La contraseña debe tener un mínimo de 8 carácteres"
              value={newPassword}
              onChange={(event) => setNewPassword(event.currentTarget.value)}
            />


            <PasswordInput
              placeholder="Confimar contraseña"
              label="Confimar contraseña"
              //error="Las contraseñas no coinciden"
              required
              value={conPassword}
              onChange={(event) => setConPassword(event.currentTarget.value)}
            />
            <br></br>
            <Group position="right">
              <Button onClick={() => PasswordChange()}>
              Guardar
              </Button>
            </Group>

      </Modal>
      <br></br>
      <Group position="left">
              <Button onClick={() => setOpened(true)}>Cambiar contraseña</Button>
      </Group>


      </>
    }
    </>
    }
    </>
    );
  }

  export default PerfilInfo
 /* <Button onClick={() => setEditing(!editing)}>
  { editing ? 'Guardar Cambios' : 'Editar' }
</Button> */