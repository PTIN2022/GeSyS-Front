import { TextInput, Group, Box, Button, Modal, Autocomplete ,Textarea, Select} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { Calendar,ChargingPile } from 'tabler-icons-react';
import { useState } from 'react';
import 'dayjs/locale/es'
import  {AveriaRowProps}  from '../pages/admin/averias';
import { useForm } from '@mantine/form';
import { locale } from 'dayjs';

const Incidencia_nueva = () => {
    const [opened, setOpened] = useState(false);
    const [incidencia, setIncidencia] = useState<AveriaRowProps>({
        id_averia:0,
        Est: '',
        Date: null, 
        State: '',
        Desc:'', 
      });
        const handleSaveClick =(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          if (incidencia.Est  == '') {
            alert('Introduce una Estacion');
            return;
          }
          if (incidencia.Date  == null) {
            alert('Introduce una fecha');
            return;
          }
          if (incidencia.State  == '') {
            alert('Introduce un estado');
            return;
          }
          if (incidencia.Desc  == '') {
            alert('Introduce una Descripcion valida');
            return;
          }

          setOpened(false)
          const jeison= {
            "estacion": incidencia.Est, "estado": incidencia.State, "fecha_averia": incidencia.Date?.toISOString().slice(0, -14), "descripcion": incidencia.Desc
          }
          const fetchData = async () => {
            await fetch("https://craaxkvm.epsevg.upc.es:23600/api/incidencias", {
            method:'POST',
            mode:'cors',
            headers:{
                'accept':'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify(jeison),    
            });    
        }
        console.log(JSON.stringify(jeison))
        fetchData(); 
        location.reload();
        }
    return (
        <>
            <Modal size="xl"
                opened={opened}
                onClose={() => setOpened(false)}
                title="Añadir Incidencia"
            >
            {
            <Box>
                <Group mt="sl" spacing="xl" grow>
                <Autocomplete 
                    label="Estacion"
                    placeholder="VG1"
                    data={['VG1','VG2','VG3','VG4',"VG5"]}
                    icon={<ChargingPile />} 
                    value={incidencia.Est} 
                    onChange={(event) => setIncidencia({...incidencia, Est: event})}
                />
                </Group> 
                <DatePicker
                        locale= 'es'
                        placeholder="Escoger Fecha"
                        label="Fecha"
                        icon={<Calendar size={16} />}
                        value={incidencia.Date}
                        onChange={(event) => setIncidencia({...incidencia, Date: event})}
                />
                <Autocomplete 
                label="Estado"
                variant="default"
                placeholder="pendiente"

                value={incidencia.State}
                data={['Pendiente','No Resuelto','Resuelto']}
                onChange={(event) => setIncidencia({...incidencia, State: event})} 
                />
                <Textarea
                    placeholder="El cargador de la planta 2 m plaza 1 no funciona"
                    label="Descripción"      
                    minRows={2}
                    maxRows={6} 
                    value={incidencia.Desc} 
                    onChange={(event) => setIncidencia({...incidencia, Desc: event.currentTarget.value})}/>
                      
                <br/>
                <Button type='submit' onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleSaveClick(event)}>
                    Guardar
                </Button>
            </Box>
        }    
        </Modal>
        <Button onClick={() => setOpened(true)}>Añadir Incidencia</Button>

    </>
    )
}
export default Incidencia_nueva;