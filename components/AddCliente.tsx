import { TextInput, Group, Box, Button, Modal, Space, Autocomplete, NumberInput } from '@mantine/core';
import { useState } from 'react';
import 'dayjs/locale/es'
import { ClientesData } from '../pages/admin/clientes';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AddCliente = (props: any) => {

  const {addCliente, clientList} = props

  const { requestAuthenticated } = useContext(AuthContext)

    const [opened, setOpened] = useState(false);
    const [cliente, setCliente] = useState<ClientesData>({
        id: -1,
        nombre: '',
        apellido: '',
        email: '',
        dni:'',
        telefono: -1,
        username: '',
    });
const handleSaveClick = () => {
    const dniReg= /^[XYZ]?\d{5,8}[A-Z]$/;
    const mail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (cliente.nombre == ''){
    alert('introduzca el nombre correctamente')
    return;
    }
    else if (cliente.apellido == ''){
        alert('introduzca el apellido correctamente')
        return;
        }
    else if(cliente.telefono==-1 || (cliente.telefono<100000000&& cliente.telefono<999999999)){
        alert('introduzca un telefono valido de 9 digitos')
        return;
    }
    else if (!dniReg.test(cliente.dni)){
        alert('introduzca un 8 digitos y una letra Mayuscula')
        return;
    }

    if (!mail.test(cliente.email)) {
      alert('Introduce un mail correcto');
      return;
    }
    
    setOpened(false)
   try{
    const form = new FormData()
    form.append("nombre", cliente.nombre);
    form.append("apellido", cliente.apellido);
    form.append('email', cliente.email);
    form.append('DNI',cliente.dni);
    form.append('foto', 'None'); //'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.mOuT5J0qeP_FHAidCHCvtwHaEK%26pid%3DApi&f=1',
    form.append('telefono',cliente.telefono.toString());
    form.append('username',cliente.nombre +"."+ cliente.apellido);
    form.append('password',cliente.nombre +"."+ cliente.apellido);
    //console.log(jeison)
    const fetchData = async () => {

      const response = await requestAuthenticated("http://craaxkvm.epsevg.upc.es:23601/api/clientes","", {
        method: "POST",
        body: form
      }) as Response


      if (response.status == 500) {
        alert(`DNI introducido ya existe en otro cliente. Introduce otro DNI.`);
      } else if (response.status != 200) {
        alert(`Error ${response.status}: ${response.statusText}`);
      } else {

        const data = await response.json() as ClientesData

        addCliente({
          ...clientList,
          data
        })
      }
     
    }
    
    fetchData();   
   }catch(err){alert ("Unaible to add:" + err)   }
     
}
    return (
    <>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
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
                <NumberInput
                    hideControls
                    label="Telefono"
                    placeholder="123456789"
                    variant="default"
                    value={cliente.telefono != -1 ? cliente.telefono : undefined}
                    onChange={(event:number) => setCliente({...cliente, telefono: event})}
                />
   

                <TextInput size="md"
                        label="DNI"
                        placeholder="12345678J"
                        variant="default"
                        value={cliente.dni}
                        onChange={(event) => setCliente({...cliente, dni: event.target.value})}
                />
                <TextInput size="md"
                        label="Email"
                        placeholder="ManuelGarcia@gmail.com"
                        variant="default"
                        value={cliente.email}
                        onChange={(event) => setCliente({...cliente, email: event.target.value})}
                /> 
                <br></br>
                    <Button type='submit' onClick={handleSaveClick}>
                        Guardar
                    </Button>
            </Box>
        }
        </Modal>

        <Button onClick={() => setOpened(true)}>Añadir Cliente</Button>
        

    </>
    )
}

export default AddCliente;