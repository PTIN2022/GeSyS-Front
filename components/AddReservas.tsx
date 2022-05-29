import { TextInput, Group, Box, Button, Modal, Space, Autocomplete } from '@mantine/core';
import { Calendar, Car, Clock, User, ChargingPile } from 'tabler-icons-react';
import { useState } from 'react';
import { DatePicker, TimeInput } from '@mantine/dates';
import { ReservaData } from '../pages/admin/reservas/[reserva]';
import 'dayjs/locale/es'
import { At,Id, Phone} from 'tabler-icons-react';
import { PerfilData, RolWorker } from '../pages/admin/perfil';
import { date, z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput} from '@mantine/core';
import { toZod } from "tozod";
import { Grid } from '@mantine/core';
import 'dayjs/locale/es'
import { Container } from '@mantine/core';
import { clientData } from '../pages/admin/clientes';
import {zj} from 'zod-joda';

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

    const schema = z.object({
        desde: z.date(),
        hasta: z.date(),
        fecha: zj.zonedDateTime().transform(date => date.toString()),
        coste: z.number({
            required_error: "Elija un coste valido"}),
        ciudad: z.string().min(1,{ message: 'Introduzca una ciudad valida' }),
        matricula: z.string().regex(new RegExp(".*[A-Z]{3}.*"), "Introduzca una matricula de 3 letras mayusculas").regex(new RegExp(".*[0-9]{4}.*"), "Introduzca una matricula con 4 digitos").min(7,{ message: 'Introduzca una matricula valida, 7 ' }),
        estacion: z.string().regex(new RegExp(".*[A-Z]{3}.*"), "Introduzca una estacion VGA").regex(new RegExp(".*[0-9]{1}.*"), "Introduzca un numero de estacion").min(1,{ message: 'Introduzca una estacion valida' }),
        dni: z.string().regex(new RegExp(".*[0-9]{8}.*"), "Introduzca minimo 8 numeros").regex(new RegExp(".*[A-Z].*"), "Introduzca un letra Mayuscula").min(9,{ message: 'Introduzca un DNI valido,9 digitos' }),
      });
        const form = useForm({
          schema: zodResolver(schema),
          initialValues: {
            desde: date(),
            hasta: date(),
            fecha: '21-05-2022',
            matricula:'',
            dni: '',
            estacion:'',
            ciudad:'',
            coste:0,
          },
        });
const handleSaveClick = () => {
    console.log("SAVING")
    const jeison= {
        'id_estacion': "VG3",//reserve.estacion,
        //'fecha_entrada' : reserve.desde?.toISOString(),
        //'fecha_final' : reserve.hasta?.toISOString(),
         "fecha_inicio": "21-05-2022 22:00",
         "fecha_final": "21-05-2022 23:00",
        "id_vehiculo": reserve.matricula.toString(),
        "id_cliente": reserve.DNI.toString(),
        // "id_cargador": 2,
        // "id_reserva": 8,

        // "id_cliente": reserve.DNI.toString(),
        // 'fecha_entrada' : reserve.desde?.toISOString(),
        // 'fecha_salida' : reserve.hasta?.toISOString(),



        // "id_estacion": "VG1",
        // "fecha_inicio": "21-05-2022 22:00",
        // "fecha_final": "21-05-2022 23:00",
        // "id_vehiculo": "LKE2378",
        // "id_cliente": "a"

    }
    //console.log(jeison)
    const fetchData = async () => {
        /*const response =*/ await fetch("https://craaxkvm.epsevg.upc.es:23600/api/reservas", {
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
                <Group mt="sl" spacing="xl" grow>
                    <TimeInput size="md"
                        label="Inicio Reserva"
                        variant="default"
                        icon={<Clock size={14} />}
                        {...form.getInputProps('desde')}
                        //value={reserve.desde}
                        //onChange={(event) => setReserve({...reserve, desde: event})} 
                        //clearable
                    />
                    <TimeInput size="md"
                        label="Fin Reserva"
                        variant="default"
                        icon={<Clock size={14} />}
                        {...form.getInputProps('hasta')}
                        //value={reserve.hasta}
                        //onChange={(event) => setReserve({...reserve, hasta: event})} 
                        //clearable
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
                        {...form.getInputProps('dni')}

                        //value={reserve.DNI}
                        //onChange={(event) => setReserve({...reserve, DNI: event.target.value})}
                    />

                </Group>


                <NumberInput size="md"
                    label="Precio"
                    placeholder=""
                    variant="default"
                    {...form.getInputProps('coste')}
                    //value={reserve.matricula}
                    //onChange={(event) => setReserve({...reserve, matricula: event.target.value})}
                />

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