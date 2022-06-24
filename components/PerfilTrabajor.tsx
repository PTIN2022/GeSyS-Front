import { Autocomplete, Box, Button, Modal, NumberInput, Space, TextInput } from '@mantine/core';
import { useState } from 'react';
import InfoPerfil from './InfoPerfil';

const EditClient = (props:any) => {
    const [opened, setOpened] = useState(false);

    // const state=(est.state.toString())  
    console.log("CLiente:",props)
    // console.log(state)
    const  [Trabajador,setTrabajador]= useState(props.cliente)
    const ConnectoApi = () => {
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
         <Modal
            opened={opened}
            onClose={CloseModal}
            title="Introduzca los datos del Cliente"
        >
        {
           <InfoPerfil username={''} pfp={''} nombre={''} apellido={''} telefono={''} email={''} dni={''} cargo={'trabajador'} question={''} estacion={''} estado={false} token={''}/>
        }
        </Modal>
        <p onClick={() => setOpened(true)}> Editar Cliente </p>
     </>
    )


  }
export default EditClient;