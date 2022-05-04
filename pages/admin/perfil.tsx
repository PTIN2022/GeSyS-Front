import { Image, Box, Group, TextInput, Tooltip, Button, Text, Grid } from '@mantine/core';
import { useState } from 'react';
import { AlertCircle, Phone, User, At, Id, IdBadge } from 'tabler-icons-react';
import { NextPage } from 'next';

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

  const [editing, setEditing] = useState<boolean>(false);

  const rightSection = (
    <Tooltip label="Contacta con un administrador para editar este campo" position="top" placement="end" color="ccdde8">
      <AlertCircle size={16} style={{ display: 'block', opacity: 0.5 }} />
    </Tooltip>
  );
  
  const [perfil, setPerfil] = useState<PerfilData>({
    username: '',
    pfp: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    dni: '',
    cargo: 'Trabajador',
  });

  return (
    <>
    <Box sx={{ maxWidth: 700 }} >
      <Grid grow gutter="xl">

        <Grid.Col span={4}>
          <Group>        
            { editing ? 
            <>
              <Image
                sx={{ width: '10em', opacity: 0.5, border: '3px solid black', borderRadius: '20px' }}
                radius="lg"
                alt={"profile picture"}
                src={perfil.pfp} /> 
              <input style={{ width: '10em'}} type={"file"} />
            </>
            :  
            <Image
              sx={{ width: '10em', border: '3px solid black', borderRadius: '20px' }}
              radius="lg"
              alt={"profile picture"}
              src={perfil.pfp} />
            }
          </Group>
          
          <Text align="left" size="lg">Manolo Pedro</Text>
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

            { editing ? 
            <TextInput size="md"
              label="Nombre"
              variant="default"
              icon={<User size={14} />}
              value={perfil.nombre}
              onChange={(event) => setPerfil({...perfil, nombre: event.target.value})} />
              :
              <TextInput size="md"
                label="Nombre"
                variant="default"
                icon={<User size={14} />}
                value={perfil.nombre}
                disabled
              />
          }
            

            { editing ? 
            <TextInput size="md"
                label="Apellido"
                variant="default"
                icon={<User size={14} />}
                value={perfil.apellido}
                onChange={(event) => setPerfil({...perfil, apellido: event.target.value})}
            />
            :

            <TextInput size="md"
              label="Apellido"
              variant="default"
              icon={<User size={14} />}
              value={perfil.apellido}
              onChange={(event) => setPerfil({...perfil, apellido: event.target.value})}
              disabled
            /> 
            }

          </Group>

          <Group mt="lg">

            { editing ?
            <TextInput size="md"
              label="Numero de Telefono"
              variant="default"
              icon={<Phone size={14} />}
              value={perfil.telefono}
              onChange={(event) => setPerfil({...perfil, telefono: event.target.value})}
            />
            :
            <TextInput size="md"
              label="Numero de Telefono"
              variant="default"
              icon={<Phone size={14} />}
              value={perfil.telefono}
              disabled
            />
            }

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
              onChange={(event) => setPerfil({...perfil, email: event.target.value})}
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
    </>
    );
  }

  export default PerfilInfo