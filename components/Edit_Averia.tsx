import { TextInput, Group, Box, Button, Modal, Autocomplete ,Textarea, Select} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { Calendar,ChargingPile } from 'tabler-icons-react';
import { useState } from 'react';
import 'dayjs/locale/es'
import  {AveriaRowProps}  from '../pages/admin/averias';
import { useContext ,useEffect} from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Edit_averia = (props:any) => {
    const { requestAuthenticated } = useContext(AuthContext)
    const [opened, setOpened] = useState(false);


    const [averia, setAveria] = useState<AveriaRowProps>(props.averia)

    useEffect(()=>{
        setAveria(props.averia)
    },[props])

        const handleSaveClick =(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
          if (averia.Est  == '') {
            alert('Introduce una Estacion');
            return;
          }
          if (averia.Date  == null) {
            alert('Introduce una fecha');
            return;
          }
          if (averia.State  == '') {
            alert('Introduce un estado');
            return;
          }
          if (averia.Desc  == '') {
            alert('Introduce una Descripcion valida');
            return;
          }
          const jeison= {
            "estacion": averia.Est, "estado": averia.State, "descripcion": averia.Desc
          }
          const fetchData = async () => {
            await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/incidencias/${averia.id_averia}`,"application/json", {
            method:'PUT',
            mode:'cors',
            /*headers:{
                'accept':'application/json',
                'Content-type':'application/json'
            },*/
            body: JSON.stringify(jeison),
            });
        }
        fetchData();
        console.log(JSON.stringify(jeison))
        props.update(averia)
        CloseModal()
        }
        const CloseModal=()=>{
            setOpened(false)
        }
    return (
        <>
            <Modal size="xl"
                opened={opened}
                onClose={CloseModal}
                title="Introduzca los datos del Cliente"
            >
            {
            <Box>
                <Group mt="sl" spacing="xl" grow>
                <Autocomplete
                    label="Estacion"
                    placeholder="VG1"
                    data={['VG1','VG2','VG3','VG4',"VG5"]}
                    icon={<ChargingPile />}
                    value={averia.Est}
                    onChange={(event) => setAveria({...averia, Est: event})}
                />
                </Group>
                <Autocomplete
                label="Estado"
                variant="default"
                placeholder="pendiente"

                value={averia.State}
                data={['Pendiente','No Resuelto','Resuelto']}
                onChange={(event) => setAveria({...averia, State: event})}
                />
                <Textarea
                    placeholder="El cargador de la planta 2 m plaza 1 no funciona"
                    label="Descripción"
                    minRows={2}
                    maxRows={6}
                    value={averia.Desc}
                    onChange={(event) => setAveria({...averia, Desc: event.currentTarget.value})}/>

                <br/>
                <Button type='submit' onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleSaveClick(event)}>
                    Guardar
                </Button>
            </Box>
        }
        </Modal>
        <p onClick={() => setOpened(true)}>Incidencia</p>

    </>
    )
}
export default Edit_averia;
