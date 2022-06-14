import { ActionIcon, Button, Center, Grid, Group,  Popover, Space, Text } from "@mantine/core";

import { Autocomplete, Box, Modal } from '@mantine/core';
import { useState } from 'react';
import { Circle } from "tabler-icons-react";
import { EstState } from '../pages/admin/estaciones';

const EditEstState = (est:any) => {
    const [opened, setOpened] = useState(false);
    const [Mopened, setMOpened] = useState(false);

    const state=(est.est.toString())    


    const ConnectToApi = () => {
        console.log("Viva el A2")
        /***********************************
         * AQUI IRIA LA CONEXIÓN CON LA API
         * 
         * 
         * 
         **********************************/
        setMOpened(false)
    }

    return(
      <>
         <Modal size="xl"
            opened={Mopened}
            onClose={() => setMOpened(false)}
            title="Modifique el estado de la estacion"
        >
          {
            <Box>
              <Autocomplete label="Elije El nuevo estado"
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


        <Group>
            <Text align="left" size="xl">Estado:
            <Popover opened={opened}  target={
                <Group onMouseEnter={()=>setOpened(true)}  onMouseLeave={() => setOpened(false)} >
                    <ActionIcon >
                        {state == 'Activa' && <Circle onClick={()=>setMOpened(true)}  fill={"#00b900"}/>}
                        {state == 'Dañada' && <Circle onClick={()=>setMOpened(true)} fill={"#ffb044"} />}
                        {state == 'Inactiva' && <Circle  onClick={()=>setMOpened(true)} fill={"#bf2200"} />} 
                    </ActionIcon> 
                    <Text size="sm">({state})</Text> 
                </Group>     
            }> 
          <div>
            <Text size="sm">Click me to change state</Text>
          </div>
        </Popover>          
        </Text>
      </Group>
     </>
    )


  }
export default EditEstState;