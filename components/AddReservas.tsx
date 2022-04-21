import { useForm, formList } from '@mantine/form';
import { TextInput, Group, ActionIcon, Box, Text, Button, Code, Autocomplete, Modal, Grid, Space } from '@mantine/core';
import { Calendar, ChargingPile, Clock, Hash, Trash, User } from 'tabler-icons-react';
import { useState } from 'react';
import { ReservaData } from '../interfaces';
import { DatePicker, TimeInput } from '@mantine/dates';

const AddReservas = () => {
    const [opened, setOpened] = useState(false);
    const [reserve, setReserve] = useState<ReservaData>({
        hora: null,
        plaza: '',
        idcliente: '',
        fecha: null,
        duracion: null,
    });

    return (
    <>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Introduzca los datos de la reserva"
        >
        {
            <Box>               
                <Group mt="md">
                    <TimeInput size="md"
                        label="Inicio Reserva"
                        variant="default"
                        icon={<Clock size={14} />}
                        value={reserve.hora}
                        onChange={(event) => setReserve({...reserve, hora: event})} 
                        clearable
                    />
                    <Space w="xs" />
                    <TimeInput size="md"
                        label="Duracion"
                        variant="default"
                        icon={<Clock size={14} />}
                        value={reserve.duracion}
                        onChange={(event) => setReserve({...reserve, duracion: event})} 
                        clearable
                    />
                </Group>
                    
                    <DatePicker
                        locale= 'es'
                        placeholder="Escoger Fecha"
                        label="Fecha"
                        icon={<Calendar size={16} />}
                        value={reserve.fecha}
                        onChange={(event) => setReserve({...reserve, fecha: event})}
                    />
                    <TextInput size="md"
                        label="Plaza"
                        placeholder="Num Plaza"
                        variant="default"
                        icon={<ChargingPile size={18} />}
                        value={reserve.plaza}
                        onChange={(event) => setReserve({...reserve, plaza: event.target.value})}
                    />
        
                    <TextInput size="md"
                        label="Id Cliente"
                        placeholder="1234..." 
                        variant="default"
                        icon={<User size={14} />}
                        value={reserve.idcliente}
                        onChange={(event) => setReserve({...reserve, idcliente: event.target.value})}
                    />
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

export default AddReservas;