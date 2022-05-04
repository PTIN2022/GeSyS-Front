import { Image, Box, Group, TextInput, Tooltip, Button, Text, Grid } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AlertCircle, Phone, User, At, Id, IdBadge } from 'tabler-icons-react';
import { NextPage } from 'next';
import { AuthContext } from '../../contexts/AuthContext';

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
}

const PerfilInfo: NextPage = () => {

  const [user, setUser] = useState<PerfilData | null>(null);
  const [editing, setEditing] = useState<boolean>(false);

  const rightSection = (
    <Tooltip label="Contacta con un administrador para editar este campo" position="top" placement="end" color="ccdde8">
      <AlertCircle size={16} style={{ display: 'block', opacity: 0.5 }} />
    </Tooltip>
  );

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user');
      const data = await response.json();
      setUser(data);
    }
    fetchUser();
  }, [])
  
  return (
    <>
    {!user ? (
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
                  src={user.pfp} />
            </Group>
            
            <Text align="left" size="lg">{user.nombre} {user.apellido}</Text>
            <Button onClick={() => setEditing(!editing)}>
              { editing ? 'Guardar Cambios' : 'Editar' }
            </Button>
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
                  value={user.nombre}
                  disabled
                />
              

              <TextInput size="md"
                label="Apellido"
                variant="default"
                icon={<User size={14} />}
                value={user.apellido}
                disabled
              /> 

            </Group>

            <Group mt="lg">

            <TextInput size="md"
                label="Numero de Telefono"
                variant="default"
                icon={<Phone size={14} />}
                value={user.telefono}
                disabled
              />

              <TextInput size="md"
                label="DNI"
                required
                rightSection={rightSection} 
                icon={<Id size={14} />}
                variant="filled"
                value={user.dni}
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
                value={user.email}
                disabled
              />

              <TextInput size="md"
                label="Cargo de Empresa"
                required
                rightSection={rightSection} 
                icon={<IdBadge size={14} />}
                variant="filled"
                value={user.cargo}
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