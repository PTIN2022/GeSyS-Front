import { TextInput, Group, Box, Button, Modal, Autocomplete ,Textarea} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { Calendar,ChargingPile } from 'tabler-icons-react';
import { useState } from 'react';
import 'dayjs/locale/es'
import  {AveriaRowProps}  from '../pages/admin/averias';
import { useForm } from '@mantine/form';

const Incidencia_nueva = () => {
    const [opened, setOpened] = useState(false);
    const [incidencia, setIncidencia] = useState<AveriaRowProps>({
        id_averia:0,
        Est: '',
        Date: null, 
        State: '',
        Desc:'', 
      });
      /*
      const handleSubmitNuevaIncidencia = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (incidencia.Est === '') {
          alert('Introduce una estacion');
          return;
        }
        if (incidencia.Date === null) {
          alert('Introduce una fecha');
          return;
        }
        if (incidencia.State === '') {
          alert('Introduce un estado');
          return;
        }
        if (incidencia.Desc === '') {
          alert('Introduce una descripción');
          return;
        }
        */
        const handleSaveClick = () => {
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
          try {
            const form = new FormData();
            form.append("estacion", incidencia.Est);
            form.append("estado", incidencia.State);
            form.append("fecha_averia", incidencia.Date!.toISOString().slice(0, -5));
            form.append("descripcion", incidencia.Desc);
            const fetchData = async () => {
              var req = new XMLHttpRequest();
              req.open("POST", 'http://craaxkvm.epsevg.upc.es:23601/api/incidencias');
              req.send(form);
              req.onload = function() {
                if (req.status != 200) { // analyze HTTP status of the response
                  alert(`Error ${req.status}: ${req.statusText}`); // e.g. 404: Not Found
                }
                else {
                  location = location
                }
              };
            }
            fetchData();
          }
          catch(error){alert ("Error de Post:" + error)   }
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
                <TextInput 
                    label="Estacion"
                    placeholder="VGA1"
                    //value={reserve.estacion}
                    //onChange={(event) => setReserve({...reserve, estacion: event})}
                    icon={<ChargingPile />} 
                    //data={['VGA1' , 'VGA2']}  
                    value={incidencia.Est} 
                    onChange={(event) => setIncidencia({...incidencia, Est: event.currentTarget.value})}
                />           
                {/*
                                <TextInput size="md"
                                label="Estado"
                                placeholder="Arreglando"
                                variant="default"
                                    //value={perfil.apellido}
                                    //onChange={(event) => setPerfil({...perfil, apellido: event.target.value})}
                                value={incidencia.State} 
                                onChange={(event) => setIncidencia({...incidencia, State: event.currentTarget.value})} 
                            />  
                */}
                      <Autocomplete 
                      label="Estado"
                      variant="default"
                      placeholder="pendiente"

                      value={incidencia.State}
                      data={['Pendiente']}
                      onChange={(event) => setIncidencia({...incidencia, State: event})} 
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
                <Textarea
                    placeholder="El cargador de la planta 2 m plaza 1 no funciona"
                    label="Descripción"      
                    minRows={2}
                    maxRows={6} 
                    value={incidencia.Desc} 
                    onChange={(event) => setIncidencia({...incidencia, Desc: event.currentTarget.value})} 
            />
                <br/>
                <Button type='submit' onClick={handleSaveClick}>
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