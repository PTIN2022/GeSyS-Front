import { Image, Box, Group, TextInput, Tooltip, Button, Text, Grid, Title, Space } from '@mantine/core';
import { useState } from 'react';
import { AlertCircle, Phone, User, At, Id, IdBadge } from 'tabler-icons-react';
import { NextPage } from 'next';

export type RolWorker = "Jefe" | "Administrador" | "Responsable" | "Trabajador";

export interface PerfilData {
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
    nombre: 'manolo',
    apellido: 'pedro juan',
    telefono: '+34 654 789 456',
    email: 'manolo.pedro.juan@gesys.com',
    dni: '48645186G',
    cargo: 'Administrador',
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
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" /> 
              <input style={{ width: '10em'}} type={"file"} />
            </>
            :  
            <Image
              sx={{ width: '10em', border: '3px solid black', borderRadius: '20px' }}
              radius="lg"
              alt={"profile picture"}
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" />
            }
          </Group>
          <Space h={10} />
          <Text align="left" size="lg"  weight={700}>Manolo Pedro</Text>
          <Space h={15} />
          <Button onClick={() => setEditing(!editing)}>
            { editing ? 'Guardar Cambios' : 'Editar' }
          </Button>
        </Grid.Col>

        <Grid.Col span={8}>
          <Title order={1}>
            <Text align="left"  inherit component="span" > Mi Cuenta  </Text>
          </Title>
          <Space h={20} />
          <Title order={3}>
            <Text align="left"  inherit component="span">Mira y edita tu información personal a continuación  </Text>
          </Title>
        </Grid.Col>
    
        <Grid.Col span={8}>                
          <Group mt="sl">

            { editing ? 
            <TextInput size="md"
              label="Nombre"
              placeholder="Pedro"
              variant="default"
              icon={<User size={14} />}
              value={perfil.nombre}
              onChange={(event) => setPerfil({...perfil, nombre: event.target.value})} />
              :
              <TextInput size="md"
                label="Nombre"
                placeholder="Pedro"
                variant="default"
                icon={<User size={14} />}
                value={perfil.nombre}
                disabled
              />
          }
            

            { editing ? 
            <TextInput size="md"
                label="Apellido"
                placeholder="Benito"
                variant="default"
                icon={<User size={14} />}
                value={perfil.apellido}
                onChange={(event) => setPerfil({...perfil, apellido: event.target.value})}
            />
            :

            <TextInput size="md"
              label="Apellido"
              placeholder="Benito"
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
              placeholder="Telefono" 
              variant="default"
              icon={<Phone size={14} />}
              value={perfil.telefono}
              onChange={(event) => setPerfil({...perfil, telefono: event.target.value})}
            />
            :
            <TextInput size="md"
              label="Numero de Telefono"
              placeholder="Telefono" 
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