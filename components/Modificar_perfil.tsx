import { TextInput, Group, Box, Button, Modal, Input, PasswordInput, InputWrapper } from '@mantine/core';

import { At,Id, Phone, User } from 'tabler-icons-react';
import { useState } from 'react';
import { PerfilData } from '../pages/admin/perfil';
import { useForm } from '@mantine/form';
const Modificar_perfil = () => {
    const [opened, setOpened] = useState(false);
    const [perfil, setPerfil] = useState();({
        username: '',
        pfp: '',
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        dni: '',
        passw:'',
        cargo:'Jefe',
        question:'',
        estacion:'',
        estado:true,
      });
  return (
    <>
        <Modal size="xl"
            opened={opened}
            onClose={() => setOpened(false)}
            title="Modificar los datos"
        >
        {
            <Box>
                <Group mt="sl" spacing="xl" grow>
                    <TextInput size='md'
                    label="Email"
                    placeholder="tu@email.com"
                    />

                    <TextInput size="md"
                        label="Apellido"
                        placeholder="Benito"
                        variant="default"
                        icon={<User size={14} />}
                        //value={perfil.apellido}
                        //onChange={(event) => setPerfil({...perfil, apellido: event.target.value})}
                    />
                </Group> 
                <Group mt="sl" spacing="xl" grow>
                    <TextInput size='md'
                    label="DNI"
                    placeholder="123456789A"
                    />

                    <TextInput size="md"
                        label="Nombre"
                        placeholder="Benito"
                        variant="default"
                        icon={<User size={14} />}
                    />
                    
                </Group> 
                <Group mt="sl" spacing="xl" grow>
                    <PasswordInput size='md'
                    label="Nueva Contraseña"
                    placeholder="nueva "
                    />
                </Group> 
                <Group mt="sl" spacing="xl" grow>
                <InputWrapper size='md' label="NuevaFoto">
                    <Input type='file'
                        size='md'
                        placeholder=""
                    />
                </InputWrapper>

                    <TextInput size="md"
                        label="Cargo"
                        placeholder=""
                        variant="default"
                        disabled
                    />
                    
                </Group> 
                
                <br/>
                <Button type='submit'>
                    Guardar
                </Button>  

            </Box>
        }
        </Modal>
        <Button>Modificar Perfil</Button>

    </>
    )
}

export default Modificar_perfil;