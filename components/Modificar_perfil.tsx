import { TextInput, Group, Box, Button, Modal, Input, PasswordInput, InputWrapper } from '@mantine/core';

import { At,Id, Phone, User } from 'tabler-icons-react';
import { useState } from 'react';
import { PerfilData } from '../pages/admin/perfil';
import { useForm } from '@mantine/form';
const Modificar_perfil = () => {
    const [opened, setOpened] = useState(false);
    const form = useForm <PerfilData> ({
    initialValues: {
      username: '',
      pfp: '',
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      dni: '',
      contraseña:'',
      confirmarContraseña:'',
      cargo:'Jefe',
    },
    validate: {
        nombre: (value) => (value.length >0 ? null : 'Introduza un nombre valido'),
        apellido: (value) => (value.length >0 ? null : 'Introduza un apellido valido'),
        username: (value) => (value.length >0 ? null : 'Introduza un username valido'),
        telefono: (value) => (value.length >8 ? null : 'Introduza un telefono valido de 9 digitos'),
        dni: (value) => (/.*[0-9]{8}.*.*[A-Z].*/.test(value) ? null : 'Introduzca un dni valido de 8 digitos y una letra mayuscula'),
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Introduzca un emal valido'),
        contraseña: (value) => (value.length >0 ? null : 'Introduza un contraseña valida'),
        confirmarContraseña: (value, values) =>
        value !== values.contraseña ? 'La contraseña no coincide' : null,
    },
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
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Group mt="sl" spacing="xl" grow>
                    <TextInput size='md'
                    label="Email"
                    placeholder="tu@email.com"
                    {...form.getInputProps('email')}
                    />

                    <TextInput size="md"
                        label="Apellido"
                        placeholder="Benito"
                        variant="default"
                        icon={<User size={14} />}
                        {...form.getInputProps('username')}
                        //value={perfil.apellido}
                        //onChange={(event) => setPerfil({...perfil, apellido: event.target.value})}
                    />
                </Group> 
                <Group mt="sl" spacing="xl" grow>
                    <TextInput size='md'
                    label="DNI"
                    placeholder="123456789A"
                    {...form.getInputProps('dni')}
                    />

                    <TextInput size="md"
                        label="Nombre"
                        placeholder="Benito"
                        variant="default"
                        icon={<User size={14} />}
                        {...form.getInputProps('nombre')}
                        //value={perfil.apellido}
                        //onChange={(event) => setPerfil({...perfil, apellido: event.target.value})}
                    />
                    
                </Group> 
                <Group mt="sl" spacing="xl" grow>
                    <PasswordInput size='md'
                    label="Nueva Contraseña"
                    placeholder="nueva "
                    {...form.getInputProps('contraseña')}
                    />

                    <PasswordInput size="md"
                        label="Confirmar Contraseña"
                        placeholder="confirmar"
                        variant="default"
                        icon={<User size={14} />}
                        {...form.getInputProps('confirmarContraseña')}
                        //value={perfil.apellido}
                        //onChange={(event) => setPerfil({...perfil, apellido: event.target.value})}
                    />
                    
                </Group> 
                <Group mt="sl" spacing="xl" grow>
                <InputWrapper size='md' label="NuevaFoto">
                    <Input type='file'
                        size='md'
                        placeholder=""
                        {...form.getInputProps('pfp')}
                    />
                </InputWrapper>

                    <TextInput size="md"
                        label="Cargo"
                        placeholder=""
                        variant="default"
                        disabled
                        {...form.getInputProps('cargo')}
                        //value={perfil.apellido}
                        //onChange={(event) => setPerfil({...perfil, apellido: event.target.value})}
                    />
                    
                </Group> 
                
                <br/>
                <Button type='submit'>
                    Guardar
                </Button>  
                </form>

            </Box>
        }
        </Modal>
        <Button onClick={() => setOpened(true)}>Modificar Perfil</Button>

    </>
    )
}

export default Modificar_perfil;