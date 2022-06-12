import { TextInput, Group, Box, Button, Modal, NativeSelect,PasswordInput } from '@mantine/core';
import { At,Id, Phone, User } from 'tabler-icons-react';
import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { Grid } from '@mantine/core';
import 'dayjs/locale/es'
import { Container } from '@mantine/core';
import { clientData } from '../pages/admin/clientes';
const AddCliente = () => {
    const [opened, setOpened] = useState(false);
    const form = useForm <clientData> ({
        initialValues: {
          username: '',
          foto: '',
          nombre: '',
          apellido: '',
          telefono: '',
          email: '',
          dni: '',
          contraseña:'',
          confirmarContraseña:'',
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
      /*
      const schema = z.object({
        username: z.string().min(1, { message: 'Introduzca un username valido' }),
        nombre: z.string().min(1, { message: 'Introduzca un nombre valido' }),
        apellido: z.string().min(1,{ message: 'Introduzca un apellido valido' }),
        telefono: z.string().length(9, { message: 'Introduzca un numero de telefono valido, 9 digitos' }),
        dni: z.string().regex(new RegExp(".*[0-9]{8}.*"), "Introduzca minimo 8 numeros").regex(new RegExp(".*[A-Z].*"), "Introduzca un letra Mayuscula").min(9,{ message: 'Introduzca un DNI valido,9 digitos' }),
        email: z.string().email({ message: 'Introduzca un email valido' }),
      });
        const form = useForm({
          schema: zodResolver(schema),
          initialValues: {
            username:'',
            nombre: '',
            apellido:'',
            telefono: '',
            dni:'',
            email:'',
          },
        });
*/
    return (
    <>
        <Modal size="xl"
            opened={opened}
            onClose={() => setOpened(false)}
            title="Introduzca los datos del nuevo clientes"
        >
        {
            <Box>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Group mt="sl" spacing="xl" grow>           
                    <TextInput size="md"
                        label="Nombre"
                        placeholder="Pedro"
                        variant="default"
                        icon={<User size={14} />}
                        {...form.getInputProps('nombre')}
                        //value={perfil.nombre}
                        //onChange={(event) => setPerfil({...perfil, nombre: event.target.value})} 
                    />

                    <TextInput size="md"
                        label="Apellido"
                        placeholder="Benito"
                        variant="default"
                        icon={<User size={14} />}
                        {...form.getInputProps('apellido')}
                        //value={perfil.apellido}
                        //onChange={(event) => setPerfil({...perfil, apellido: event.target.value})}
                    />
                </Group> 
                <Group mt="sl" spacing="xl" grow> 
                    <TextInput size="md"
                        label="Username"
                        placeholder="username"
                        variant="default"
                        icon={<User size={14} />}
                        {...form.getInputProps('username')}
                        //value={perfil.nombre}
                        //onChange={(event) => setPerfil({...perfil, nombre: event.target.value})} 
                    />   
                    <TextInput size="md"
                        label="Correo electronico"
                        placeholder="@gmail.com"
                        icon={<At size={14} />} 
                        variant="default"
                        {...form.getInputProps('email')}

                        //value={perfil.email}
                        //onChange={(event) => setPerfil({...perfil, email: event.target.value})}
                    />
                </Group>

                <Group mt="sl" spacing="xl" grow>
                    <TextInput size="md"
                        label="Numero de Telefono"
                        placeholder="Telefono" 
                        variant="default"
                        icon={<Phone size={14} />}
                        {...form.getInputProps('telefono')}
                        //value={perfil.telefono}
                        //onChange={(event) => setPerfil({...perfil, telefono: event.target.value})}
                    />

                    <TextInput size="md"
                        label="DNI"
                        placeholder="28982938A" 
                        icon={<Id size={14} />}
                        variant="default"
                        {...form.getInputProps('dni')}
                        //value={perfil.dni}
                        //onChange={(event) => setPerfil({...perfil, dni: event.target.value})}
                    />
                </Group>
                <Group mt="sl" spacing="xl" grow>
                    <PasswordInput size='md'
                    label="Contraseña"
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
                <br/>
                <Button type='submit'>
                    Guardar
                </Button>  
                </form>
            </Box>
        }
        </Modal>
        <Button onClick={() => setOpened(true)}>Añadir Trabajador</Button>

    </>
    )
}

export default AddCliente;