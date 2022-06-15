import { TextInput, Group, Box, Button, Modal, Space, Autocomplete } from '@mantine/core';
import { Car, Clock, User, ChargingPile } from 'tabler-icons-react';
import { useState } from 'react';
import { TimeInput } from '@mantine/dates';
import 'dayjs/locale/es'
import { ReservaRowProps } from '../pages/admin/reservas';

export interface ReservaDatos {
  id_estacion: string;
  fecha_inicio: Date;
  fecha_final: Date;
  id_vehiculo: string;
  id_cliente: string;
  tarifa: number;
  asistida: true;
  porcentaje_carga: number;
  precio_carga_completo: number;
  precio_carga_actual: number;
  estado_pago: boolean;
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
  return (
    [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes())
    ].join(':')
  );
}

const AddReserva = () => {
    const [opened, setOpened] = useState(false);
    const [reserve, setReserve] = useState<ReservaDatos>({
      "id_estacion": "VG1",
      "fecha_inicio": new Date("2022-04-18T11:00:00"),
      "fecha_final": new Date("2022-04-18T18:00:00"),
      "id_vehiculo": "WW0HRW0",
      "id_cliente": "96559131Y",
      "tarifa": 12.7,
      "asistida": true,
      "porcentaje_carga": 30,
      "precio_carga_completo": 30,
      "precio_carga_actual": 5,
      "estado_pago": true
    });

    const handleSaveClick = () => {
      const data = {
        ...reserve,
        fecha_inicio: formatDate(reserve.fecha_inicio),
        fecha_final: formatDate(reserve.fecha_final)
      }

      fetch("http://craaxkvm.epsevg.upc.es:23601/api/reservas", {
        "method":'POST',
        "headers":{
            'accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
        })
        .then(() => {
          setOpened(false)
        })
        .catch(error => {
          alert(error)
        })
      }
      
    return (
    <>
        <Modal size='xl'
            opened={opened}
            onClose={() => setOpened(false)}
            title="Introduzca los datos de la reserva"
        >
        {
            <Box> 

                {<Autocomplete 
                    label="Estacion"
                    placeholder="VGA1"
                    {...form.getInputProps('estacion')}
                    //value={reserve.estacion}
                    //onChange={(event) => setReserve({...reserve, estacion: event})}
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
                        placeholder="0000 AAA"
                        variant="default"
                        icon={<Car size={18} />}
                        {...form.getInputProps('matricula')}

                        //value={reserve.matricula}
                        //onChange={(event) => setReserve({...reserve, matricula: event.target.value})}
                    />
        
                    <TextInput size="md"
                        label="DNI"
                        placeholder="1234..." 
                        variant="default"
                        icon={<User size={14} />}
                        value={reserve.reservante}
                        onChange={(event) => setReserve({...reserve, reservante: event.target.value})}
                    />

                </Group>

                <Group mt="sl" spacing="xl" grow>
                <NumberInput size="md"
                    label="Precio"
                    variant="default"
                    decimalSeparator=","
                    precision={2}
                    {...form.getInputProps('coste')}
                    //value={reserve.matricula}
                    //onChange={(event) => setReserve({...reserve, matricula: event.target.value})}
                />
                <NumberInput size="md"
                    label="nªPlaza"
                    variant="default"
                    placeholder='nª Plaza 20'
                    decimalSeparator=","
                    precision={0}
                    {...form.getInputProps('nªPlaza')}
                    //value={reserve.matricula}
                    //onChange={(event) => setReserve({...reserve, matricula: event.target.value})}
                />
                </Group>

                <TextInput size="md"
                    label="Ciudad"
                    placeholder="ciudad" 
                    variant="default"
                    {...form.getInputProps('ciudad')}

                    //value={reserve.DNI}
                    //onChange={(event) => setReserve({...reserve, DNI: event.target.value})}
                />

                    <br></br>
                    <Button type='submit' onClick={handleSaveClick}>
                        Guardar
                    </Button>
                    </form>
            </Box>
        }
        </Modal>

        <Button onClick={() => setOpened(true)}>Añadir Reserva</Button>
        
    </>
    )
}

export default AddReserva;