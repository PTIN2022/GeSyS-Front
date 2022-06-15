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
        money: 30, //tarifa
        asistida: true,
        //estado: true,
        estado_pago: true,
        carga_completa: 25,
        perc_carga: 30, 
        //city: string; 
        estacion: 'VG1', //id_estacion  
        //duration: number;
    });

    const handleSaveClick = () => {
        setOpened(false)
        const jeison= {
            //'id': 0,
            'id_estacion': reserve.estacion,
            //'id_cargador': reserve.nPlaza, //id_cargador
            'fecha_inicio': reserve.date, //fecha_entrada
            'fecha_final': reserve.date_fin, //fecha_salida
            'id_cliente': reserve.reservante, //id_cliente 70390883M 
            'id_vehiculo': reserve.matricula, //id_vehiculo G35O03O
            'precio_carga_actual': reserve.kwh, //precio_carga_actual
            'tarifa': reserve.money, //tarifa
            'asistida': reserve.asistida,
            //estado: true,
            'estado_pago': reserve.estado_pago,
            'precio_carga_completo': reserve.carga_completa,
            'porcentaje_carga': reserve.perc_carga, 
        }
        //console.log(jeison)
        const fetchData = async () => {
            /*const response =*/ await fetch("https://craaxkvm.epsevg.upc.es:23600/api/reservas", {
            method:'POST',
            headers:{
                'accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(jeison),
            //mode:'no-cors'
            });    
        }
        console.log(JSON.stringify(jeison))
        fetchData();  

    /*const handleSubmitNewPromo = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        if (reserve.reservante === '') {
          alert('Introduce el DNI del reservante');
          return;
        }
        if (reserve.matricula === '') {
          alert('Introduce una matricula');
          return;
        }
        if (reserve.date === null) {
          alert('Introduce una hora');
          return;
        }
        if (reserve.date_fin === null) {
          alert('Introduce una hora fin');
          return;
        }
       /* if (reserve.nPlaza === 0) {
            alert('Introduce una plaza de carga');
            return;
          }*/
  
        /*const data: ReservaRowProps = {
          id: reserve.id, //id_reserva
          reservante : reserve.reservante, //id_cliente
          matricula: reserve.matricula, //id_vehiculo
          nPlaza: reserve.nPlaza, //id_cargador
          date: reserve.date, //fecha_entrada
          date_fin: reserve.date_fin, //fecha_salida
          kwh: reserve.kwh, //precio_carga_actual
          money: reserve.money, //tarifa
          asistida: reserve.asistida,
          //estado: reserve.estado,
          estado_pago: reserve.estado_pago,
          carga_completa: reserve.carga_completa,
          perc_carga: reserve.perc_carga, 
          estacion: reserve.estacion,
        }
  
        try {
  
          const form = new FormData();
          form.append("id_cargador", data.nPlaza.toString());
          form.append("fecha_inicio", data.date!.toISOString().slice(0, -5)); // Hack para que la mierda api funcione
          form.append("fecha_final", data.date_fin!.toISOString().slice(0, -5)); // Hack para que la mierda api funcione
          form.append("id_vehiculo", data.matricula);
          form.append("id_cliente", data.reservante);
          //form.append("estado", data.estado == true ? 'activa' : 'inactiva');
          form.append("estado_pago", data.estado_pago == true ? 'activa' : 'inactiva');
          form.append("asistida", data.asistida == true ? 'activa' : 'inactiva');
          form.append("precio_carga_actual", data.kwh.toString());
          form.append("tarifa", data.money.toString());
          form.append("porcentaje_carga", data.perc_carga.toString());
          form.append("precio_carga_completo", data.carga_completa.toString());
          form.append("id_estacion", data.estacion);
  
          const res = await fetch('https://craaxkvm.epsevg.upc.es:23600/api/reservas', {
            "method": "POST",
            body: form,
            "headers": {
              "accept": "application/json"
            }
          });
  
          const json = await res.json();
          if (res.status === 200) {
            props.triggerReload();
            setReserve({
                id: 0,
                reservante : '', //id_cliente
                matricula: '', //id_vehiculo
                nPlaza: 32, //id_cargador
                date: null, //fecha_entrada
                date_fin: null, //fecha_salida
                kwh: 0, //precio_carga_actual
                money: 0, //tarifa
                asistida: true,
                //estado: true,
                estado_pago: true,
                carga_completa: 0,
                perc_carga: 0, 
                estacion: 'VG1',
            })
            setOpened(false);
            console.log(JSON.stringify(setReserve))
          }
          else {
            alert('Error al crear la reserva');
            // Display the key/value pairs
            for (var pair of form.entries() as any) {
              console.log(pair[0]+ ', ' + pair[1]); 
            }
            console.log(json);
          }
    
        }
        catch (error) {
          console.error(error);
        }*/
  
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