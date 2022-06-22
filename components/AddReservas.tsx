import { TextInput, Group, Box, Button, Modal, Space, Autocomplete,NumberInput } from '@mantine/core';
import { Calendar, Car, Clock, User, ChargingPile } from 'tabler-icons-react';
import { useState } from 'react';
import { DatePicker, TimeInput } from '@mantine/dates';
import { ReservaData } from '../pages/admin/reservas/[reserva]';
import 'dayjs/locale/es'
import { useForm } from '@mantine/form';

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
    const [reserve, setReserve] = useState<ReservaData>({
        desde: null,
        hasta: null,
        fecha: null,
        matricula: '',
        DNI: '',
        estacion: '',
        coste:0,
        nPlaza:0,
    });
    const form = useForm <ReservaData> ({
        initialValues: {
            desde:null,
            hasta:null,
            fecha:null,
            matricula: '',
            DNI: '',
            estacion: '',
            coste: 0,
            //ciudad:'',
            nPlaza:0,
        },
        validate: {
            estacion: (value) => (/.*[A-Z]{3}.*.*[0-9].*/.test(value) ? null : 'Introduzca una estacion "VGA" y su numero'),
            DNI: (value) => (/.*[0-9]{8}.*.*[A-Z].*/.test(value) ? null : 'Introduzca un dni valido de 8 digitos y una letra mayuscula'),
            matricula: (value) => (/.*[0-9]{4}.*.*[A-Z]{3}.*/.test(value) ? null : 'Introduzca una matricula de 4 numeros y 3 letras mayusculas'),
            //ciudad: (value) => (value.length >0 ? null : 'Introduza un ciudad valida'),
            fecha: (value) => (value!=null ? null : 'Introduza una fecha valida'),
            desde: (value) => (value!=null ? null : 'Introduza una hora valida'),
            hasta: (value) => (value!=null ? null : 'Introduza una hora valida'),
            coste: (value) => (value>-0.0001 ? null : 'Introduzca un valor valido'),
            nPlaza:(value) => (value>-0.0001 ? null : 'Introduzca un valor valido')
        },
      });

      //const [opened, setOpened] = useState(false);
      /*const [reserve, setReserve] = useState<ReservaDatos>({
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
      */

return (
    <>
        <Modal size='xl'
            opened={opened}
            onClose={() => setOpened(false)}
            title="Introduzca los datos de la reserva"
        >
        {
            <Box> 

                <form onSubmit={form.onSubmit((values) => console.log(values))}>

                <Autocomplete 
                    label="Estacion"
                    placeholder="VGA1"
                    {...form.getInputProps('estacion')}
                    //value={reserve.estacion}
                    //onChange={(event) => setReserve({...reserve, estacion: event})}
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
                        {...form.getInputProps('fecha')}

                        //value={reserve.fecha}
                        //onChange={(event) => setReserve({...reserve, fecha: event})}
                    />
                <Group mt="sl" spacing="xl" grow>

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
                        {...form.getInputProps('DNI')}

                        //value={reserve.DNI}
                        //onChange={(event) => setReserve({...reserve, DNI: event.target.value})}
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
                    {...form.getInputProps('nPlaza')}
                    //value={reserve.matricula}
                    //onChange={(event) => setReserve({...reserve, matricula: event.target.value})}
                />
                </Group>
               
                    <br></br>
                    <Button type='submit'>
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