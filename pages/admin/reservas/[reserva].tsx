import { NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import AddIncidents from "../../../components/AddIncidents";
import { Image, Box, Group, TextInput, Tooltip, Button, Text, Grid } from '@mantine/core';
import { useState } from 'react';
import { AlertCircle, Phone, User, At, Id, IdBadge, Check } from 'tabler-icons-react';
import { PerfilData } from '../../../interfaces';
import Link from 'next/link';

const ShowReserva: NextPage = () => {

  const { query } = useRouter();
  const { reserva } = query;

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
                onChange={(event) => setPerfil({...perfil, nombre: event.target.value})}
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
              onChange={(event) => setPerfil({...perfil, telefono: event.target.value})}
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
              onChange={(event) => setPerfil({...perfil, dni: event.target.value})}
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
              onChange={(event) => setPerfil({...perfil, cargo: event.target.value})}
              disabled
            />  

          </Group>
        </Grid.Col>
      </Grid>
    </Box>
    </>
    );
}

export default ShowReserva;