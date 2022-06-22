import { Image, Box, Group, TextInput, Tooltip, Button, Text, Grid } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AlertCircle, Phone, User, At, Id, IdBadge } from 'tabler-icons-react';
import { NextPage } from 'next';
import { AuthContext } from '../../contexts/AuthContext';
//import Modificar_perfil from '../../components/Modificar_perfil';


export type RolWorker = "Jefe" | "Administrador" | "Responsable" | "Trabajador";

export interface PerfilData {
  username: string;
  pfp: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: string;
  cargo: RolWorker;
  passw: string;
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
    ) : 
    (
      <Box sx={{ maxWidth: 700 }} >
        <Grid grow gutter="xl">

          <Grid.Col span={4}>
            <Group> 
                    
              <Image
                  sx={{ width: '10em', border: '3px solid black', borderRadius: '20px' }}
                  radius="lg"
                  alt={"profile picture"}
                  src={perfil.pfp} />
            </Group>

            <Text align="left" size="lg">{perfil.nombre} {perfil.apellido}</Text>
          </Grid.Col>

          <Grid.Col span={7}>
            <Text align="left" size="xl"> Mi Cuenta  </Text>
            <Text align="left" size="sm">Mira y edita tu información personal a continuación  </Text>
          </Grid.Col>
      
          <Grid.Col span={7}>                
            <Group mt="sl">

            <TextInput size="md"
                  label="Nombre"
                  variant="default"
                  icon={<User size={14} />}
                  value={perfil.nombre}
                  disabled
                />
              

              <TextInput size="md"
                label="Apellido"
                variant="default"
                icon={<User size={14} />}
                value={perfil.apellido}
                disabled
              /> 

            </Group>

            <Group mt="lg">

            <TextInput size="md"
                label="Numero de Telefono"
                variant="default"
                icon={<Phone size={14} />}
                value={perfil.telefono}
                disabled
              />

              <TextInput size="md"
                label="DNI"
                required
                rightSection={rightSection} 
                icon={<Id size={14} />}
                variant="filled"
                value={perfil.dni}
                disabled
              />  
            </Group>

            <br></br>

            <Group mt="sl">
              <TextInput size="md"
                label="Correo electronico"
                required
                rightSection={rightSection}
                icon={<At size={14} />} 
                variant="filled"
                value={perfil.email}
                disabled
              />

              <TextInput size="md"
                label="Cargo de Empresa"
                required
                rightSection={rightSection} 
                icon={<IdBadge size={14} />}
                variant="filled"
                value={perfil.cargo}
                disabled
              />  

            </Group>
          </Grid.Col>
        </Grid>
      </Box>
    )}
    </>
    );
  }

  export default PerfilInfo
 /* <Button onClick={() => setEditing(!editing)}>
  { editing ? 'Guardar Cambios' : 'Editar' }
</Button> */