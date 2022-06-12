import { TextInput, Group, Box, Button, Modal, Select ,PasswordInput} from '@mantine/core';
import { At,Id, Phone, User } from 'tabler-icons-react';
import { useState } from 'react';
import { PerfilData, RolWorker } from '../pages/admin/perfil';
import { useForm } from '@mantine/form';


const AddTrabajador = () => {
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
                title="Introduzca los datos del nuevo trabajador"
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
                        <TextInput size="md"
                            label="Correo electronico"
                            placeholder="@gmail.com"
                            icon={<At size={14} />} 
                            variant="default"
                            {...form.getInputProps('email')}
    
                            //value={perfil.email}
                            //onChange={(event) => setPerfil({...perfil, email: event.target.value})}
                        />
                        <Select
                            label="Cargo"
                            data={[ "Jefe", "Administrador", "Responsable", "Trabajador" ]}

                            //value={perfil.cargo}
                            //onChange={(event) => setPerfil({...perfil, cargo: event as RolWorker})}
                            {...form.getInputProps('cargo')}
                        />
                    </Group>
                    <Group mt="sl" spacing="xl" grow>
                        <PasswordInput size="md"
                            label="Contraseña"
                            placeholder="Contraseña" 
                            variant="default"
                            {...form.getInputProps('contraseña')}
                            //value={perfil.telefono}
                            //onChange={(event) => setPerfil({...perfil, telefono: event.target.value})}
                        />
    
                        <PasswordInput size="md"
                            label="Confirmar Contraseña"
                            placeholder="Confirmar" 
                            {...form.getInputProps('confirmarContraseña')}
                            //value={perfil.dni}
                            //onChange={(event) => setPerfil({...perfil, dni: event.target.value})}
                        />
                    </Group>
                    <br/>
                    <Button id='submit' type='submit'>
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
    
    export default AddTrabajador;