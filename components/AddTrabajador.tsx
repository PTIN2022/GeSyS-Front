import { TextInput, Group, Box, Button, Modal } from '@mantine/core';
import { At,Id, IdBadge, Phone, User } from 'tabler-icons-react';
import { useState } from 'react';
import { PerfilData } from '../interfaces';


const AddTrabajador = () => {
    const [opened, setOpened] = useState(false);
    const [perfil, setPerfil] = useState<PerfilData>({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        dni: '',
        cargo: '',
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
                <Group mt="sl" spacing="xl" grow>              
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

                <Group mt="sl" spacing="xl" grow>
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
                        placeholder="483.878.878" 
                        icon={<Id size={14} />}
                        variant="default"
                        value={perfil.dni}
                        onChange={(event) => setPerfil({...perfil, dni: event.target.value})}
                    />
                </Group>

                <Group mt="sl" spacing="xl" grow> 
                    <TextInput size="md"
                        label="Correo electronico"
                        placeholder="@gmail.com"
                        icon={<At size={14} />} 
                        variant="default"
                        value={perfil.email}
                        onChange={(event) => setPerfil({...perfil, email: event.target.value})}
                    />
                    <TextInput size="md"
                        label="Cargo de Empresa"
                        placeholder="Cargo"
                        icon={<IdBadge size={14} />}
                        variant="default"
                        value={perfil.cargo}
                        onChange={(event) => setPerfil({...perfil, cargo: event.target.value})}
                    />
                </Group>
                <br></br>
                <Button type='submit'>
                    Guardar
                </Button>  
            </Box>
        }
        </Modal>

        <Button onClick={() => setOpened(true)}>Añadir Reserva</Button>
        
    </>
    )
}

export default AddTrabajador;