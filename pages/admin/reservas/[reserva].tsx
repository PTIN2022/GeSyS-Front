import { NextPage } from "next"
import { useRouter } from "next/router";
import { Box, Group, TextInput, Button, Text, Grid, Autocomplete, NumberInput } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import 'dayjs/locale/es'
import { useContext, useEffect, useState } from 'react';
import { User, Car, Clock, Calendar, ChargingPile } from 'tabler-icons-react';
import { EstacionRowProps } from "../estaciones";
import { AuthContext } from "../../../contexts/AuthContext";
import { ReservaRowProps } from ".";

export interface ReservaData {
  desde: Date | null,
  hasta: Date | null,
  fecha: Date | null,
  matricula: string,
  DNI: string,
  estacion: number,
  coste:number,
  nPlaza:number,

}

const Reserva: NextPage = (props:any) => {
  const { requestAuthenticated } = useContext(AuthContext)

  const { query } = useRouter();
  const { reserva } = query;

  const [editing, setEditing] = useState<boolean>(false);
  
  const [reserve, setReserve] = useState<ReservaData>({
    desde: null,
    hasta: null,
    fecha: null,
    matricula: '',
    DNI: '',
    estacion: -1,
    coste:0,
    nPlaza:0,
  });
  /**
   * Funciones para adecuar el formato de las fechas
   */
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
      ' ' 
      //+
      // [
      //   padTo2Digits(date.getHours()),
      //   padTo2Digits(date.getMinutes())
      // ].join(':')
    );
  }
/**************************************
 * Obtenemos la info real de la reserva
 **************************************/
 useEffect(() => {
    const fetchEstacion = async () => {
      const result = await requestAuthenticated (`https://craaxkvm.epsevg.upc.es:23600/api/reservas/${reserva}`)
      const data = await result.json();
      const res:ReservaData = {        
        DNI: data.id_cliente,
        matricula: data.id_vehiculo,
        estacion: data.id_estacion,
        nPlaza: data.id_cargador,       
        desde: new Date (data.fecha_entrada), 
        hasta: new Date (data.fecha_salida), 
        fecha: new Date (data.fecha_entrada), //??
        coste: data.precio_carga_completa, //data[i].tarifa,
      
      }
      setReserve(res);
    }
    fetchEstacion()
  },[reserva])
  console.log("Reserva:",reserva)


  const connect=() =>{
    setEditing(!editing)
    if (editing == false){return}
        // DNI: data.id_cliente,
        // matricula: data.id_vehiculo,
        // estacion: data.id_estacion,
        // nPlaza: data.id_cargador,       
        // desde: new Date (data.fecha_entrada), 
        // hasta: new Date (data.fecha_salida), 
        // fecha: new Date (data.fecha_entrada), //??
        // coste: data.precio_carga_completa, //data[i].tarifa,
      
    const jeison = {
      fecha_inicio: formatDate(reserve.fecha!) + reserve.desde?.getHours()+':'+ reserve.desde?.getMinutes(),
      fecha_fijnal: formatDate(reserve.fecha!) + reserve.hasta?.getHours()+':'+ reserve.hasta?.getMinutes(),
      id_vehiculo: reserve.matricula,
      tarifa: 0,
      asistida:true,
      porcentaje_carga:40,
      percio_carga_completo:6,
      precio_carga_actual:3,
    }
    const fetchData = async () => {
      const response = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/reservas/${reserva}`, "application/json", {
        "method":'PUT',          
        body: JSON.stringify(jeison),
        })as Response

      if (response.status != 200) {
        alert(`Error ${response.status}: ${response.statusText}`);
      }
    }
    fetchData()
  }





  return (
    <>
    <Box sx={{ maxWidth: 700 }} >
      <Grid grow gutter="xl">

        <Grid.Col span={4}>          
          <Text align="left" size="xl">Reserva: {reserva}</Text>
          <br></br>
          <Button onClick={connect}>
            { editing ? 'Guardar Cambios' : 'Editar' }
          </Button>
        </Grid.Col>

        <Grid.Col span={7}>
          <Text align="left" size="xl">Datos de la Reserva</Text>
          <Text align="left" size="md">Mira y edita la información de la reserva {reserva}</Text>
        </Grid.Col>
        <Grid.Col span={7}>
          <Group mt="sl">
            { editing ? 
              <NumberInput size="md"
                label="nºPlaza"
                variant="default"
                placeholder='nº Plaza'
                value={reserve.nPlaza}
                onChange={(event) => setReserve({...reserve,  nPlaza: event!})}
                /> 
              // <Autocomplete 
              //     label="Estacion"
              //     placeholder="id estacion"
              //     value={reserve.estacion.toString()}
              //     onChange={(event) => setReserve({...reserve, estacion: parseInt(event)})}
              //     icon={<ChargingPile />} 
              //     data={estList.map((item) => {return item["id"].toString()})} 
              // />
              :
              <NumberInput size="md"
              label="nºPlaza"
              variant="default"
              placeholder='nº Plaza'
              value={reserve.nPlaza}
              disabled
              onChange={(event) => setReserve({...reserve,  nPlaza: event!})}
              /> 
            }
          </Group>  
        </Grid.Col>
 
        <Grid.Col span={7}>             
          <Group mt="sl">     
          { editing ? 
            <TimeInput size="md"
              label="Inicio Reserva"
              variant="default"
              icon={<Clock size={14} />}
              value={reserve.desde}
              onChange={(event) => setReserve({...reserve, desde: event})} 
              clearable
              />
              :
              <TimeInput size="md"
                label="Inicio Reserva"
                variant="default"
                icon={<Clock size={14} />}
                value={reserve.desde}
                onChange={(event) => setReserve({...reserve, desde: event})}
                disabled
              />
          }

          { editing ? 
            <TimeInput size="md"
              label="Fin Reserva"
              variant="default"
              icon={<Clock size={14} />}
              value={reserve.hasta}
              onChange={(event) => setReserve({...reserve, hasta: event})} 
              clearable
            />
              :
              <TimeInput size="md"
                label="Fin Reserva"
                variant="default"
                icon={<Clock size={14} />}
                value={reserve.hasta}
                onChange={(event) => setReserve({...reserve, hasta: event})}
                disabled
              />
          }
            

            { editing ? 
            <TextInput size="md"
                label="Matricula"
                placeholder="Num matricula"
                variant="default"
                icon={<Car size={18} />}
                value={reserve.matricula}
                onChange={(event) => setReserve({...reserve, matricula: event.target.value})}
            />
            :

            <TextInput size="md"
              label="Matricula"
              placeholder="Num matricula"
              variant="default"
              icon={<Car size={18} />}
              value={reserve.matricula}
              onChange={(event) => setReserve({...reserve, matricula: event.target.value})}
              disabled
            /> 
            }

          </Group>

          <Group mt="lg">

            { 
            <TextInput size="md"
              label="ID reservante"
              placeholder="1234..." 
              variant="default"
              icon={<User size={14} />}
              value={reserve.DNI}
              onChange={(event) => setReserve({...reserve, DNI: event.target.value})}
              disabled
            />
            }

            { editing ?
              <DatePicker
                locale= 'es'
                placeholder="Escoger Fecha"
                label="Fecha"
                icon={<Calendar size={16} />}
                value={reserve.fecha}
                onChange={(event) => setReserve({...reserve, fecha: event})}
              />
            :
              <DatePicker
                locale="es"
                placeholder="Escoge Fecha"
                label="Fecha"
                icon={<Calendar size={16} />}
                value={reserve.fecha}
                onChange={(event) => setReserve({...reserve, fecha: event})}
                disabled
              />
            }
          </Group>
        </Grid.Col>
      </Grid>
    </Box>
    </>
    );
}

export default Reserva;
