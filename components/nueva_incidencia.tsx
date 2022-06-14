import { TextInput, Group, Box, Button, Modal, Autocomplete ,Textarea} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { Calendar, Car, Clock, User, ChargingPile } from 'tabler-icons-react';
import { useState } from 'react';
import 'dayjs/locale/es'
import  {AveriaRowProps}  from '../pages/admin/averias';
import { useForm } from '@mantine/form';

const Incidencia_nueva = (props:any) => {
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
          /*if (incidencia.Est == '' ||
              incidencia.Date == null ||
              incidencia.State == '' ||
              incidencia.Desc == '' ){
      
              alert('Error: Missing fields')
              return;
          }*/
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
          /*
    const data: AveriaRowProps={
        id: incidencia.id,
        Est: incidencia.Est,
        //Dir: string;
        Date:  incidencia.Date,
        State:  incidencia.State,
        Desc: incidencia.Desc,
    }*/
    try {

        const form = new FormData();
        form.append("descripcion", incidencia.Desc);
        form.append("estado", incidencia.State);
        form.append("name_estacion", incidencia.Est);
        form.append("fecha_averia", incidencia.Date!.toISOString().slice(0, -5));
        const fetchData = async () => {
          var request = new XMLHttpRequest();
          request.open("POST", 'https://craaxkvm.epsevg.upc.es:23600/api/incidencias');
          request.send(form);
          
          request.onload = function() {
              if (request.status != 200) { // analyze HTTP status of the response
                alert(`Error ${request.status}: ${request.statusText}`); // e.g. 404: Not Found
              } else {
                  location = location
              }
            };
        }
        fetchData();
      }catch(err){alert ("Error de Post:" + err)   }
      }
      
        /*
        const res = await fetch('https://craaxkvm.epsevg.upc.es:23600/api/incidencias', {
          method: 'POST',
          body: form,
          "headers": {
            "accept": "application/json"
          }
        });
        const json = await res.json();
        if (res.status === 200) {
          props.triggerReload();
          setIncidencia({
              id:-1,
              Est: '',
              Date: null, 
              State: '',
              Desc:'', 
          })
          setOpened(false);
        }
        else {
          alert('Error al crear la promoción');
          // Display the key/value pairs
          for (var pair of form.entries() as any) {
            console.log(pair[0]+ ', ' + pair[1]); 
          }
          console.log(json);
        }
  
      }
      catch (error) {
        console.error(error);
      }
    }*/
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

                <TextInput size="md"
                    label="Estado"
                    placeholder="Arreglando"
                    variant="default"
                        //value={perfil.apellido}
                        //onChange={(event) => setPerfil({...perfil, apellido: event.target.value})}
                    value={incidencia.State} 
                    onChange={(event) => setIncidencia({...incidencia, State: event.currentTarget.value})} 
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