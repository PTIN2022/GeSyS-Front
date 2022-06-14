import { Autocomplete, Box, Button, Modal, Space } from '@mantine/core';
import { useState } from 'react';
import { EstState } from '../pages/admin/estaciones';

const EditState = (est:any) => {
    const [modalopened, setmodalpened] = useState(false);

    const state=(est.state.toString())  
    console.log(est)
    console.log(state)

    const ConnectToApi = () => {
        console.log("Viva el A2")
        /***********************************
         * AQUI IRIA LA CONEXIÓN CON LA API
         * 
         * 
         * 
         **********************************/
        setmodalpened(false)
    }

    return(
      <>
        <Modal size="xl"
            opened={modalopened}
            onClose={() => setmodalpened(false)}
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
        <p onClick={() => setmodalpened(true)}> Editar Estacion </p>
     </>
    )


  }
export default EditState;