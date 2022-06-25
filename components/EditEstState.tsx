import { ActionIcon, Button, Center, Grid, Group,  Popover, Space, Text } from "@mantine/core";

import { Autocomplete, Box, Modal } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { Circle } from "tabler-icons-react";
import { AuthContext } from "../contexts/AuthContext";
import { EstState } from '../pages/admin/estaciones';

const EditEstState = (est:any) => {

  const { requestAuthenticated } = useContext(AuthContext)

    const [opened, setOpened] = useState(false);
    const [Mopened, setMOpened] = useState(false);
    const [state,setState] = useState(est.estacion.estado.toString())    

  useEffect (() =>{
    if (est.estacion.estado.toString() != ""){
      setState(est.estacion.estado.toString())
    }
  },[est])
  console.log(state)

    const ConnectToApi = () => {
      if (! EstState.includes(state)){
        alert("Estado no valido")
        return
      } 
      // console.log("Viva el A2")
      const object={...est.estacion, estado:state}
      // console.log("Borramos:",delete object.Cargadores)
      // console.log("OBJECT:",object)
      // console.log("da real:",JSON.stringify(object) )
      const fetchData = async () => {
        const response = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/estaciones/${object.id_estacion}`, "application/json", {
          method: "PUT",
          body: JSON.stringify(object)          
        }) 
      }
      fetchData()
      console.log("finalobject", object)
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
                data={EstState}
                value={state}
                onChange={setState}
                onClick={() => setState("")}
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
            <Text size="sm">Click to change state --{">"}</Text>
          </div>
        </Popover>          
        </Text>
      </Group>
     </>
    )


  }
export default EditEstState;