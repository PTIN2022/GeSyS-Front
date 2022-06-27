import { TextInput, Group, Box, Button, Modal, Select } from '@mantine/core';
import { At,Id, Phone, User, LockAccess } from 'tabler-icons-react';
import { useContext, useState } from 'react';
import { PerfilData, RolWorker } from '../pages/admin/perfil';
import { AuthContext } from '../contexts/AuthContext';

interface TrabajadorInput {
  id_estacion: string;
  estado: boolean;
  question: string;
  nombre: string;
  telefono: string;
  username: string;
  password: string;
  email: string;
  cargo: string;
  apellido: string;
  dni: string;
}

const AddTrabajador = (props: any) => {

  const { requestAuthenticated } = useContext(AuthContext)

    const [opened, setOpened] = useState(false);
    const [perfil, setPerfil] = useState<TrabajadorInput>({
      id_estacion: '',
      estado: false,
      question: '',
      nombre: '',
      telefono: '',
      username: '',
      password: '',
      email: '',
      cargo: '',
      apellido: '',
      dni: ''
    });
      
      const handleSubmitNewPromo = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const dniReg= /^[XYZ]?\d{5,8}[A-Z]$/;
        const mail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (perfil.username === '') {
          alert('Introduzca un username');
          return;
        } 
        if (perfil.nombre === '') {
          alert('Introduzca un nombre');
          return;
        }
        if (perfil.apellido === '') {
          alert('Introduzca los apellidos');
          return;
        }

        if (perfil.telefono.length!= 9 ) {
          alert('Introduzca telefono de 9 digitos');
          return;
        }
        if (!mail.test(perfil.email)) {
          alert('Introduce un mail correcto');
          return;
        }
        else if (!dniReg.test(perfil.dni)){
          alert('Introduzca un DNI no duplicado de  8 digitos y una letra mayúscula')
          return;
      }
        if (perfil.cargo === null) {
        alert('Escoja un cargo');
        return;
        }
        if (perfil.password === '') {
          alert('Introduce una contraseña');
          return;
        }

      //AFEGIR TREBALLADOR
      try {

        const form = new FormData();
        form.append("nombre", perfil.nombre);
        form.append("username", perfil.username);
        form.append("apellido", perfil.apellido); 
        form.append("telefono", perfil.telefono);
        form.append("email", perfil.email);
        form.append("dni", perfil.dni);
        form.append("password", perfil.password);
        form.append("cargo", perfil.cargo);
        form.append("question", perfil.question);
        form.append("id_estacion", perfil.id_estacion);
        form.append("estado", perfil.estado == true ? 'activa' : 'inactiva');

        const res = await requestAuthenticated('https://craaxkvm.epsevg.upc.es:23600/api/trabajador', 'multipart/form-data', {
          "method": "POST",
          body: form
        });

        const json = await res.json();
        if (res.status === 200 && json != null) {
          props.triggerReload();
          setPerfil({
            id_estacion: '',
            estado: false,
            question: '',
            nombre: '',
            telefono: '',
            username: '',
            password: '',
            email: '',
            cargo: '',
            apellido: '',
            dni: ''
          })
          setOpened(false);
        }
        else {
          alert('Error al crear el trabajador');
          // Display the key/value pairs
          for (var pair of form.entries() as any) {
            console.log(pair[0]+ ', ' + pair[1]); 
          }
          console.log(json);
        }
  
      }
      catch (error) {
        console.error(error);
      }

    }

    return (
    <>
        <Modal size="xl"
            opened={opened}
            onClose={() => setOpened(false)}
            title="Introduzca los datos del nuevo trabajador"
        >   
            <Box>
                <Group mt="sl" spacing="xl" grow>              
                    <TextInput size="md"
                        label="Nombre"
                        placeholder="Pedro"
                        variant="default"
                        icon={<User size={14} />}
                        value={perfil.nombre}
                        onChange={(event) => setPerfil({...perfil, nombre: event.currentTarget.value})} 
                    />

                    <TextInput size="md"
                        label="Apellido"
                        placeholder="Benito"
                        variant="default"
                        icon={<User size={14} />}
                        value={perfil.apellido}
                        onChange={(event) => setPerfil({...perfil, apellido: event.currentTarget.value})}
                    />
                </Group> 

                <Group mt="sl" spacing="xl" grow>
                    <TextInput size="md"
                        label="Numero de Telefono"
                        placeholder="Telefono" 
                        variant="default"
                        icon={<Phone size={14} />}
                        value={perfil.telefono}
                        onChange={(event) => setPerfil({...perfil, telefono: event.currentTarget.value})}
                    />

                    <TextInput size="md"
                        label="DNI"
                        placeholder="483.878.878" 
                        icon={<Id size={14} />}
                        variant="default"
                        value={perfil.dni}
                        onChange={(event) => setPerfil({...perfil, dni: event.currentTarget.value})}
                    />
                </Group>

                <Group mt="sl" spacing="xl" grow> 
                    <TextInput size="md"
                        label="Correo electronico"
                        placeholder="@gmail.com"
                        icon={<At size={14} />} 
                        variant="default"
                        value={perfil.email}
                        onChange={(event) => setPerfil({...perfil, email: event.currentTarget.value})}
                    />
                    <Select 
                        label="Cargo"
                        value={perfil.cargo}
                        onChange={(event) => setPerfil({...perfil, cargo: event as RolWorker})}
                        data={[ "Jefe", "Administrador", "Responsable", "Trabajador" ]} 
                    />

                </Group>

                <Group mt="sl" spacing="xl" grow> 
                    <TextInput size="md"
                        label="Contraseña"
                        placeholder="1234Queso"
                        icon={<LockAccess size={14} />} 
                        variant="default"
                        value={perfil.password}
                        onChange={(event) => setPerfil({...perfil, password: event.currentTarget.value})}
                    />
                </Group>
                <Group mt="sl" spacing="xl" grow> 
                    <TextInput size="md"
                        label="Username"
                        placeholder="qwerty3"
                        icon={<LockAccess size={14} />} 
                        variant="default"
                        value={perfil.username}
                        onChange={(event) => setPerfil({...perfil, username: event.currentTarget.value})}
                    />
                </Group>
                <br/>
                <Button type='submit' onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleSubmitNewPromo(event)}>
                    Guardar
                </Button>  
            </Box>
        
        </Modal>
        <Button onClick={() => setOpened(true)}>Añadir Trabajador</Button>

    </>
    )
}

export default AddTrabajador;
