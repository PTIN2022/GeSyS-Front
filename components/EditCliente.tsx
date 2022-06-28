import { Autocomplete, Box, Button, Modal, NumberInput, Space, TextInput } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ClientesData } from '../pages/admin/clientes';

const EditClient = (props:any) => {
    const [opened, setOpened] = useState(false);
    const { requestAuthenticated } = useContext(AuthContext)
    const { requestAuthenticatedForm } = useContext(AuthContext)

    // const state=(est.state.toString())  
    console.log("CLiente:",props)
    // console.log(state)
    const  [cliente,setCliente]= useState<ClientesData>(props.cliente)
    useEffect(()=>{
        setCliente(props.cliente)
    },[props])
    const ConnectoApi = () => {
        console.log("Viva el A2")
        /***********************************
         * AQUI VA LA CONEXIÓN CON LA API 
         **********************************/
         const form = new FormData()
         form.append('dni',cliente.dni);
         form.append("name", cliente.nombre);
         form.append("lastname", cliente.apellido);
         form.append('email', cliente.email);
         form.append('picture', 'None'); //'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mOuT5J0qeP_FHAidCHCvtwHaEK%26pid%3DApi&f=1',
         form.append('telf',cliente.telefono.toString());
         form.append('username',cliente.nombre +"."+ cliente.apellido);
         form.append('password',cliente.nombre +"."+ cliente.apellido);
        //  form.append('saldo',cliente.saldo.toString());
        const fetchData = async () => {
            const request = await requestAuthenticatedForm(`https://craaxkvm.epsevg.upc.es:23600/api/clientes/${cliente.id}`,"PUT",form)
            request.onload = function() {
              if (request.status != 200) { // analyze HTTP status of the response
                alert(`Error ${request.status}: ${request.statusText}`); // e.g. 404: Not Found
              }
            }
        }
        fetchData()
        console.log("finalobject", form.get('name'))
        props.actualitza(cliente)
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
                    value={parseInt(cliente.telefono.toString()) != -1 ? parseInt(cliente.telefono.toString()) : undefined}
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