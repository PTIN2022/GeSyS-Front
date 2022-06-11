import { TextInput, Group, Box, Button, Modal, Space, Autocomplete, NumberInput } from '@mantine/core';
import { Calendar, Car, Clock, User, ChargingPile } from 'tabler-icons-react';
import { useState } from 'react';
import { DatePicker, TimeInput } from '@mantine/dates';
import { ReservaData } from '../pages/admin/reservas/[reserva]';
import 'dayjs/locale/es'
import { ClientesData } from '../pages/admin/clientes';

const AddCliente = () => {
    const [opened, setOpened] = useState(false);
    const [cliente, setCliente] = useState<ClientesData>({
        id: -1,
        nombre: '',
        apellido: '',
        email: '',
        dni:'',
        telefono: -1,
        username: '',
    });
const handleSaveClick = () => {
    setOpened(false)
    const jeison= {
        'nombre': cliente.nombre,
        'apellido': cliente.apellido,
        'email': cliente.email,
        'dni': cliente.dni,
        'foto':'',
        'telefono':cliente.telefono,
        'username': cliente.nombre +"."+ cliente.apellido,
        'password': cliente.nombre +"."+ cliente.apellido,
    }
    //console.log(jeison)
    const fetchData = async () => {
        /*const response =*/ await fetch("https://craaxkvm.epsevg.upc.es:23600/api/clientes", {
        method:'POST',
        headers:{
            //'Access-Control-Allow-Headers': '*',
            'accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(jeison),
        //mode:'no-cors'
        });    
    }
    console.log(JSON.stringify(jeison))
    fetchData();    
}
    return (
    <>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Introduzca los datos del Cliente"
        >
        {
            <Box> 
                    <TextInput size="md"
                        label="Nombre"
                        placeholder="Manolo"
                        variant="default"
                        value={cliente.nombre}
                        onChange={(event) => setCliente({...cliente, nombre: event.target.value})}
                    />
                    <TextInput size="md"
                        label="Apellido"
                        placeholder="Garcia"
                        variant="default"
                        value={cliente.apellido}
                        onChange={(event) => setCliente({...cliente, apellido: event.target.value})}
                    /> 
   
                <TextInput size="md"
                        label="Email"
                        placeholder="ManuelGarcia@gmail.com"
                        variant="default"
                        value={cliente.email}
                        onChange={(event) => setCliente({...cliente, email: event.target.value})}
                /> 
                <TextInput size="md"
                        label="DNI"
                        placeholder="12345678J"
                        variant="default"
                        value={cliente.dni}
                        onChange={(event) => setCliente({...cliente, dni: event.target.value})}
                />
                <NumberInput
                    hideControls
                    label="Telefono"
                    placeholder="123456789"
                    variant="default"
                    value={cliente.telefono != -1 ? cliente.telefono : undefined}
                    onChange={(event:number) => setCliente({...cliente, telefono: event})}
                />
                <br></br>
                    <Button type='submit' onClick={handleSaveClick}>
                        Guardar
                    </Button>
            </Box>
        }
        </Modal>

        <Button onClick={() => setOpened(true)}>Añadir Cliente</Button>
        
    </>
    )
}

export default AddCliente;