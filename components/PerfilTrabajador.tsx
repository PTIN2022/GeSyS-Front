import { Autocomplete, Box, Button, Modal, NumberInput, Space, Text, TextInput } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { PerfilData } from '../pages/admin/perfil';
import InfoPerfil from './InfoPerfil';

const EditClient = (props:any) => {
    const [opened, setOpened] = useState(false);
    const { requestAuthenticated } = useContext(AuthContext)
    const [Trabajador, setTrabajador] = useState<PerfilData>();
    console.log(props.dni)

    useEffect(() => {
      const fetchDatos = async () => {
        const result = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/trabajador/${props.dni}`, {
          method:'GET'
        });
        const data = await result.json();
        console.log(data)
        setTrabajador(data)
      }
      fetchDatos()
    }, [])
  
    // const state=(est.state.toString())  

    // console.log(state)

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
            centered
            size="xl"
            opened={opened}
            onClose={CloseModal}
            title="Introduzca los datos del Cliente"
        >
        {
          <InfoPerfil {...Trabajador}/>
        }
        </Modal>
        <p onClick={() => setOpened(true)}> Editar Trabajador </p>
     </>
    )


  }
export default EditClient;