import { Avatar, Box, Group, TextInput, Tooltip, Button } from '@mantine/core';
import { useState } from 'react';
import { AlertCircle, Phone, User, At, Id, IdBadge } from 'tabler-icons-react';
import { PerfilData } from '../../interfaces';
import { NextPage } from 'next';

const PerfilInfo: NextPage = () => {

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
            <Avatar 
                radius="lg" 
                size="xl" 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" 
            />
            <br></br>
            <Group mt="sl">

                <TextInput size="md"
                    label="Nombre"
                    placeholder="Pedro"
                    variant="default"
                    icon={<User size={14} />}
                    value={perfil.nombre}
                    onChange={(event) => setPerfil({...perfil, nombre: event.target.value})}
                />

                <TextInput size="md"
                    label="Apellido"
                    placeholder="Benito"
                    variant="default"
                    icon={<User size={14} />}
                    value={perfil.apellido}
                    onChange={(event) => setPerfil({...perfil, apellido: event.target.value})}
                /> 

            </Group>
            <br></br>
            <Group mt="sl">
                <TextInput size="md"
                    label="Numero de Telefono"
                    placeholder="Telefono" 
                    variant="default"
                    icon={<Phone size={14} />}
                    value={perfil.telefono}
                    onChange={(event) => setPerfil({...perfil, telefono: event.target.value})}
                />

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
                    value={perfil.dni}
                    onChange={(event) => setPerfil({...perfil, dni: event.target.value})}
                    disabled
                />  
            </Group>
            <br></br>
            <Button>
                Guardar
            </Button>
        </Box>
      
        </>
    );
  }

  export default PerfilInfo