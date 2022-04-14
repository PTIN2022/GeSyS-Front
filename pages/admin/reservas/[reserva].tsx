import { NextPage } from "next"
import { useRouter } from "next/router";
import { Box, Group, TextInput, Button, Text, Grid } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/es'
import { useState } from 'react';
import { User, ChargingPile, Clock, Calendar } from 'tabler-icons-react';
import { ReservaData } from '../../../interfaces';

const reserva: NextPage = () => {

  const { query } = useRouter();
  const { reserva } = query;

  const [editing, setEditing] = useState<boolean>(false);
  
  const [reserve, setReserve] = useState<ReservaData>({
    hora: '',
    plaza: '',
    idcliente: '',
    fecha: null,
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
          <Text align="left" size="md">Mira y edita la información de la reserva "{reserva}"   </Text>
        </Grid.Col>
    
        <Grid.Col span={7}>                
          <Group mt="sl">

            { editing ? 
            <TextInput size="md"
              label="Hora de reserva"
              placeholder="10:00"
              variant="default"
              icon={<Clock size={14} />}
              value={reserve.hora}
              onChange={(event) => setReserve({...reserve, hora: event.target.value})} />
              :
              <TextInput size="md"
                label="Hora de reserva"
                placeholder="10:00"
                variant="default"
                icon={<Clock size={14} />}
                value={reserve.hora}
                onChange={(event) => setReserve({...reserve, hora: event.target.value})}
                disabled
              />
          }
            

            { editing ? 
            <TextInput size="md"
                label="Plaza"
                placeholder="Num Plaza"
                variant="default"
                icon={<ChargingPile size={18} />}
                value={reserve.plaza}
                onChange={(event) => setReserve({...reserve, plaza: event.target.value})}
            />
            :

            <TextInput size="md"
              label="Plaza"
              placeholder="Num Plaza"
              variant="default"
              icon={<ChargingPile size={18} />}
              value={reserve.plaza}
              onChange={(event) => setReserve({...reserve, plaza: event.target.value})}
              disabled
            /> 
            }

          </Group>

          <Group mt="lg">

            { editing ?
            <TextInput size="md"
              label="Id Cliente"
              placeholder="1234..." 
              variant="default"
              icon={<User size={14} />}
              value={reserve.idcliente}
              onChange={(event) => setReserve({...reserve, idcliente: event.target.value})}
            />
            :
            <TextInput size="md"
              label="Id Cliente"
              placeholder="1234..." 
              variant="default"
              icon={<User size={14} />}
              value={reserve.idcliente}
              onChange={(event) => setReserve({...reserve, idcliente: event.target.value})}
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

export default reserva;