import { Autocomplete, Box, Button, Modal, Space } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { EstState } from '../pages/admin/estaciones';

const EditState = (props:any) => {
    const [opened, setOpened] = useState(false);
    const { requestAuthenticated } = useContext(AuthContext)


    const [state,setState]= useState(props.state.toString())  
    // console.log(est)
    // console.log(state)
    useEffect (() =>{
      if (props.state.toString() != ""){
        setState(props.state.toString())
      }
    },[props])

    const ConnectToApi = () => {
        console.log("Viva el A2")
        if (! EstState.includes(state)){
          alert("Estado no valido")
          return
        } 
        // console.log("Viva el A2")
        const object={estado:state}
        // console.log("Borramos:",delete object.Cargadores)
        // console.log("OBJECT:",object)
        // console.log("da real:",JSON.stringify(object) )
        const fetchData = async () => {
          const response = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/estaciones/${props.id}`, "application/json", {
            method: "PUT",
            body: JSON.stringify({"estado":state})          
          }) 
        }
        fetchData()
        console.log("finalobject", object)
        props.actualitza(state)
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
                onChange={setState}
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