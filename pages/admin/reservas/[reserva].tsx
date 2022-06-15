import { NextPage } from "next"
import { useRouter } from "next/router";
import { Box, Group, TextInput, Button, Text, Grid, Autocomplete } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import 'dayjs/locale/es'
import { useState } from 'react';
import { User, Car, Clock, Calendar, ChargingPile } from 'tabler-icons-react';

export interface ReservaData {
  desde: Date | null,
  hasta: Date | null,
  fecha: Date | null,
  matricula: string,
  DNI: string,
  estacion: string,
  coste:number,
  nPlaza:number,

}

const Reserva: NextPage = () => {

  const { query } = useRouter();
  const { reserva } = query;

  const [editing, setEditing] = useState<boolean>(false);
  
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

  return (
    <>
    <Box sx={{ maxWidth: 700 }} >
      <Grid grow gutter="xl">

        <Grid.Col span={4}>          
          <Text align="left" size="xl">Reserva: {reserva}</Text>
          <br></br>
          <Button onClick={() => setEditing(!editing)}>
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
              <Autocomplete 
                  label="Estacion"
                  placeholder="VGA1"
                  value={reserve.estacion}
                  onChange={(event) => setReserve({...reserve, estacion: event})}
                  icon={<ChargingPile />} 
                  data={['VGA1' , 'VGA2']} 
              />
              :
              <Autocomplete 
                  label="Estacion"
                  placeholder="VGA1"
                  icon={<ChargingPile />}
                  disabled 
                  data={['VGA1' , 'VGA2']} 
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

            { editing ?
            <TextInput size="md"
              label="DNI"
              placeholder="1234..." 
              variant="default"
              icon={<User size={14} />}
              value={reserve.DNI}
              onChange={(event) => setReserve({...reserve, DNI: event.target.value})}
            />
            :
            <TextInput size="md"
              label="DNI"
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
