import { TextInput, Group, Box, Button, Modal, Space, Autocomplete,NumberInput } from '@mantine/core';
import { Calendar, Car, Clock, User, ChargingPile } from 'tabler-icons-react';
import { useState } from 'react';
import { DatePicker, TimeInput } from '@mantine/dates';
import { ReservaData } from '../pages/admin/reservas/[reserva]';
import 'dayjs/locale/es'
import { useForm } from '@mantine/form';


const AddReserva = () => {
    const [opened, setOpened] = useState(false);
    const [reserve, setReserve] = useState<ReservaData>({
        desde: null,
        hasta: null,
        fecha: null,
        matricula: '',
        DNI: '',
        estacion: '',
        ciudad:'',
        coste:0,
        nªPlaza:0,
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
            ciudad:'',
            nªPlaza:0,
        },
        validate: {
            estacion: (value) => (/.*[A-Z]{3}.*.*[0-9].*/.test(value) ? null : 'Introduzca una estacion "VGA" y su numero'),
            DNI: (value) => (/.*[0-9]{8}.*.*[A-Z].*/.test(value) ? null : 'Introduzca un dni valido de 8 digitos y una letra mayuscula'),
            matricula: (value) => (/.*[0-9]{4}.*.*[A-Z]{3}.*/.test(value) ? null : 'Introduzca una matricula de 4 numeros y 3 letras mayusculas'),
            ciudad: (value) => (value.length >0 ? null : 'Introduza un ciudad valida'),
            fecha: (value) => (value!=null ? null : 'Introduza una fecha valida'),
            desde: (value) => (value!=null ? null : 'Introduza una hora valida'),
            hasta: (value) => (value!=null ? null : 'Introduza una hora valida'),
            coste: (value) => (value>-0.0001 ? null : 'Introduzca un valor valido'),
            nªPlaza:(value) => (value>-0.0001 ? null : 'Introduzca un valor valido')
        },
      });

const handleSaveClick = () => {
    setOpened(false)
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