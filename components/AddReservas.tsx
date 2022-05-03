import { TextInput, Group, Box, Button, Modal, Space, Autocomplete } from '@mantine/core';
import { Calendar, Car, Clock, User, ChargingPile } from 'tabler-icons-react';
import { useState } from 'react';
import { DatePicker, TimeInput } from '@mantine/dates';
import { ReservaData } from '../pages/admin/reservas/[reserva]';
import 'dayjs/locale/es'

const AddReserva = () => {
    const [opened, setOpened] = useState(false);
    const [reserve, setReserve] = useState<ReservaData>({
        desde: null,
        hasta: null,
        fecha: null,
        matricula: '',
        DNI: '',
        estacion: '',
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
                <Autocomplete 
                    label="Estacion"
                    placeholder="VGA1"
                    value={reserve.estacion}
                    onChange={(event) => setReserve({...reserve, estacion: event})}
                    icon={<ChargingPile />} 
                    data={['VGA1' , 'VGA2']} 
                />            
                <Group mt="md">
                    <TimeInput size="md"
                        label="Inicio Reserva"
                        variant="default"
                        icon={<Clock size={14} />}
                        value={reserve.desde}
                        onChange={(event) => setReserve({...reserve, desde: event})} 
                        clearable
                    />
                    <Space w="xs" />
                    <TimeInput size="md"
                        label="Fin Reserva"
                        variant="default"
                        icon={<Clock size={14} />}
                        value={reserve.hasta}
                        onChange={(event) => setReserve({...reserve, hasta: event})} 
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
                        label="Matricula"
                        placeholder="Matricula"
                        variant="default"
                        icon={<Car size={18} />}
                        value={reserve.matricula}
                        onChange={(event) => setReserve({...reserve, matricula: event.target.value})}
                    />
        
                    <TextInput size="md"
                        label="DNI"
                        placeholder="1234..." 
                        variant="default"
                        icon={<User size={14} />}
                        value={reserve.DNI}
                        onChange={(event) => setReserve({...reserve, DNI: event.target.value})}
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

export default AddReserva;