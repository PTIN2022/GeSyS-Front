import { TextInput, Group, Box, Button, Modal, Space } from '@mantine/core';
import { Calendar, Car, Clock, User } from 'tabler-icons-react';
import { useState } from 'react';
import { DatePicker, TimeInput } from '@mantine/dates';
import { ReservaData } from '../pages/admin/reservas/[reserva]';
import 'dayjs/locale/es'

const AddReserva = () => {
    const [opened, setOpened] = useState(false);
    const [reserve, setReserve] = useState<ReservaData>({
        hora_inicio: null,
        matricula: '',
        DNI: '',
        fecha: null,
        hora_fin: null,
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
                        value={reserve.hora_inicio}
                        onChange={(event) => setReserve({...reserve, hora_inicio: event})} 
                        clearable
                    />
                    <Space w="xs" />
                    <TimeInput size="md"
                        label="Fin Reserva"
                        variant="default"
                        icon={<Clock size={14} />}
                        value={reserve.hora_fin}
                        onChange={(event) => setReserve({...reserve, hora_fin: event})} 
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