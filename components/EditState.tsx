import { Autocomplete, Box, Button, Modal, Space } from '@mantine/core';
import { useState } from 'react';
import { EstState } from '../pages/admin/estaciones';

const EditState = (props:any) => {
    const [opened, setOpened] = useState(false);

    const state=(props.state.toString())  
    // console.log(est)
    // console.log(state)

    const ConnectToApi = () => {
        console.log("Viva el A2")
        /***********************************
         * AQUI IRIA LA CONEXIÓN CON LA API
         * 
         * 
         * 
         **********************************/
         CloseModal()
        }
        const CloseModal=()=>{
            setOpened(false)
            //props.menu = ! props.menu
            props.menu();
            // location=location
        }

    return(
      <>
        <Modal size="xl"
            opened={opened}
            onClose={CloseModal}
            title="Modifique el estado de la estacion"
        >
          {
            <Box>
            <Autocomplete label="Elije el nuevo estado"
                placeholder={state}
                data={EstState}
                />
                <Space h={25}/>
                <Button onClick={ConnectToApi}>
                    Guardar
                </Button>

            </Box>
            
          }
        </Modal>
        <p onClick={() => setOpened(true)}> Editar Estacion </p>
     </>
    )


  }
export default EditState;