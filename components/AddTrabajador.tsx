import { TextInput, Group, Box, Button, Modal, Select } from '@mantine/core';
import { At,Id, Phone, User, LockAccess } from 'tabler-icons-react';
import { useState } from 'react';
import PerfilInfo, { PerfilData, RolWorker } from '../pages/admin/perfil';


const AddTrabajador = (props: any) => {
    const [opened, setOpened] = useState(false);
    const [perfil, setPerfil] = useState<PerfilData>({
        username: '',
        nombre: '',
        pfp: '',
        apellido: '',
        telefono: '',
        email: '',
        dni: '',
        passw: 'admin',
        cargo: 'Trabajador',
        question: 'Como?',
        estacion: 'VG1',
        estado: true,
      });
      
      const handleSubmitNewPromo = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        //^(\d{8})([A-Z])$/
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
        if (perfil.passw === '') {
          alert('Introduce una contraseña');
          return;
          }

      const data: PerfilData = {
        username: perfil.username,
        nombre: perfil.nombre,
        pfp: perfil.pfp,
        apellido: perfil.apellido,
        telefono: perfil.telefono,
        email: perfil.email,
        dni: perfil.dni,
        passw: perfil.passw,
        cargo: perfil.cargo,
        question: perfil.question,
        estacion: perfil.estacion,
        estado: perfil.estado,
         
      }
      //AFEGIR TREBALLADOR
      try {

        const form = new FormData();
        form.append("nombre", data.nombre);
        form.append("username", data.username);
        form.append("foto", data.pfp); 
        form.append("apellido", data.apellido); 
        form.append("telefono", data.telefono);
        form.append("email", data.email);
        form.append("dni", data.dni);
        form.append("password", data.passw);
        form.append("cargo", data.cargo);
        form.append("question", data.question);
        form.append("id_estacion", data.estacion);
        form.append("estado", data.estado == true ? 'activa' : 'inactiva');

        const res = await fetch('https://craaxkvm.epsevg.upc.es:23600/api/trabajador', {
          "method": "POST",
          body: form,
          "headers": {
            "accept": "application/json"
          }
        });

        const json = await res.json();
        if(res.status == 500) {
          alert('Error al crear el trabajador');
          // Display the key/value pairs
          for (var pair of form.entries() as any) {
            console.log(pair[0]+ ', ' + pair[1]); 
          }
          console.log(json);
        }
        else if (res.status === 200) {
          props.triggerReload();
          setPerfil({
            username: '',
            nombre: '',
            pfp: 'https://editor.swagger.io/',
            apellido: '',
            telefono: '',
            email: '',
            dni: '',
            passw: 'admin',
            cargo: 'Trabajador',
            question: 'Como?',
            estacion: 'VGA1',
            estado: true,
          })
          setOpened(false);
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
                        type='number'
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
                        value={perfil.passw}
                        onChange={(event) => setPerfil({...perfil, passw: event.currentTarget.value})}
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

