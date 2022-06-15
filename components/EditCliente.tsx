import { Autocomplete, Box, Button, Modal, NumberInput, Space, TextInput } from '@mantine/core';
import { useState } from 'react';

const EditClient = (props:any) => {
    const [opened, setOpened] = useState(false);

    // const state=(est.state.toString())  
    console.log("CLiente:",props)
    // console.log(state)
    const  [cliente,setCliente]= useState(props.cliente)
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
            <Box> 
                    <TextInput size="md"
                        label="Nombre"
                        placeholder="Manolo"
                        variant="default"
                        value={cliente.nombre}
                        onChange={(event) => setCliente({...cliente, nombre: event.target.value})}
                    />
                    <TextInput size="md"
                        label="Apellido"
                        placeholder="Garcia"
                        variant="default"
                        value={cliente.apellido}
                        onChange={(event) => setCliente({...cliente, apellido: event.target.value})}
                    /> 
   
                <TextInput size="md"
                        label="Email"
                        placeholder="ManuelGarcia@gmail.com"
                        variant="default"
                        value={cliente.email}
                        onChange={(event) => setCliente({...cliente, email: event.target.value})}
                /> 
                <TextInput size="md"
                        label="DNI"
                        placeholder="12345678J"
                        variant="default"
                        value={cliente.dni}
                        onChange={(event) => setCliente({...cliente, dni: event.target.value})}
                />
                <NumberInput
                    hideControls
                    label="Telefono"
                    placeholder="123456789"
                    variant="default"
                    value={parseInt(cliente.telefono) != -1 ? cliente.telefono : undefined}
                    onChange={(event:number) => setCliente({...cliente, telefono: event})}
                />
                <br></br>
                    <Button type='submit' onClick={ConnectoApi}>
                        Guardar
                    </Button>
            </Box>
        }
        </Modal>
        <p onClick={() => setOpened(true)}> Editar Cliente </p>
     </>
    )


  }
export default EditClient;