import { TextInput, Group, Box, Button, Modal, Space, Autocomplete } from '@mantine/core';
import { Calendar, Car, Clock, User, ChargingPile } from 'tabler-icons-react';
import { useState } from 'react';
import { DatePicker, TimeInput } from '@mantine/dates';
import 'dayjs/locale/es'
import { ReservaRowProps } from '../pages/admin/reservas';
import Reserva from '../pages/admin/reservas/[reserva]';

const AddReserva = () => {
    const [opened, setOpened] = useState(false);
    const [reserve, setReserve] = useState<ReservaRowProps>({
        id: 0, //id_reserva
        reservante : '', //id_cliente
        matricula: '', //id_vehiculo
        nPlaza: 0, //id_cargador
        date: null, //fecha_entrada
        date_fin: null, //fecha_salida
        kwh: 5, //precio_carga_actual
        money: 12.7, //tarifa
        asistida: true,
        estado_pago: true,
        carga_completa: 25,
        perc_carga: 30,  
        estacion: 'VG1', //id_estacion  
    });

    const handleSaveClick = () => {
        setOpened(false)
        const jeison= {
            'id_estacion': reserve.estacion,
            'fecha_inicio': reserve.date!.toISOString().slice(0, -5), //fecha_entrada
            'fecha_final': reserve.date_fin!.toISOString().slice(0, -5), //fecha_salida
            'id_vehiculo': reserve.matricula, //id_vehiculo 44PI774
            'id_cliente': reserve.reservante, //id_cliente 54602347Q 
            'tarifa': reserve.money, //tarifa
            'asistida': reserve.asistida,
            'porcentaje_carga': reserve.perc_carga,
            'precio_carga_actual': reserve.kwh, //precio_carga_actual
            'precio_carga_completo': reserve.carga_completa,  
            'estado_pago': reserve.estado_pago,     
        }
        //console.log(jeison)

        const fetchData = async () => {
            /*const response =*/ await fetch("https://craaxkvm.epsevg.upc.es:23600/api/reservas", {
            "method":'POST',
            "headers":{
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
            title="Introduzca los datos de la reserva"
        >
        {
            <Box> 
                {<Autocomplete 
                    label="Estacion"
                    placeholder="VGA1"
                    value={reserve.estacion}
                    onChange={(event) => setReserve({...reserve, estacion: event})}
                    icon={<ChargingPile />} 
                    data={['VGA1' , 'VGA2']} 
                /> }        
                <Group mt="md">
                    <TimeInput size="md"
                        label="Inicio Reserva"
                        variant="default"
                        icon={<Clock size={14} />}
                        value={reserve.date}
                        onChange={(event) => setReserve({...reserve, date: event})} 
                        clearable
                    />
                    <Space w="xs" />
                    <TimeInput size="md"
                        label="Fin Reserva"
                        variant="default"
                        icon={<Clock size={14} />}
                        value={reserve.date_fin}
                        onChange={(event) => setReserve({...reserve, date_fin: event})} 
                        clearable
                    />
                </Group>
                    
                    {/*<DatePicker
                        locale= 'es'
                        placeholder="Escoger Fecha"
                        label="Fecha"
                        icon={<Calendar size={16} />}
                        value={reserve.fecha}
                        onChange={(event) => setReserve({...reserve, fecha: event})}
                    />*/}
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
                        value={reserve.reservante}
                        onChange={(event) => setReserve({...reserve, reservante: event.target.value})}
                    />
                    <br></br>
                    <Button type='submit' onClick={handleSaveClick}>
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