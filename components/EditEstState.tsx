import { ActionIcon, Button, Center, Grid, Group,  Popover, Space, Text } from "@mantine/core";

import { Autocomplete, Box, Modal } from '@mantine/core';
import { useState } from 'react';
import { Circle } from "tabler-icons-react";
import { EstState } from '../pages/admin/estaciones';

const EditEstState = () => {
    const [opened, setOpened] = useState(false);
    const [Mopened, setMOpened] = useState(false);

    const [state,setState] = useState("Activa")
    
    console.log("LAOFINQWEPDFIOIN")
    return(
      <>
         <Modal size="xl"
            opened={Mopened}
            onClose={() => setMOpened(false)}
            title="Introduzca los datos del nuevo clientes"
        >
          {
            <Box>
              <Autocomplete label="Elije El nuevo estado"
                placeholder="Estado"
                data={EstState}
                />
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