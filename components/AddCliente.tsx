import { TextInput, Group, Box, Button, Modal, Space, Autocomplete, NumberInput } from '@mantine/core';
import { Calendar, Car, Clock, User, ChargingPile } from 'tabler-icons-react';
import { useState } from 'react';
import { DatePicker, TimeInput } from '@mantine/dates';
import { ReservaData } from '../pages/admin/reservas/[reserva]';
import 'dayjs/locale/es'
import { ClientesData } from '../pages/admin/clientes';

const AddCliente = () => {
    const [opened, setOpened] = useState(false);
    const [cliente, setCliente] = useState<ClientesData>({
        id: -1,
        nombre: '',
        apellido: '',
        email: '',
        dni:'',
        telefono: '',
        username: '',
    });
const handleSaveClick = () => {
    const dniReg= /^[XYZ]?\d{5,8}[A-Z]$/;
    const mail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (cliente.nombre == ''){
    alert('Introduzca el nombre correctamente')
    return;
    }
    else if (cliente.apellido == ''){
        alert('Introduzca el apellido correctamente')
        return;
        }
    else if(cliente.telefono.length!=9){
        alert('Introduzca un telefono válido de 9 digitos')
        return;
    }
    else if (!dniReg.test(cliente.dni)){
        alert('Introduzca un DNI no duplicado de 8 digitos y una letra Mayúscula ')
        return;
    }

    if (!mail.test(cliente.email)) {
      alert('Introduzca un mail correcto');
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
        var request = new XMLHttpRequest();
        request.open("POST", "http://craaxkvm.epsevg.upc.es:23601/api/clientes");
        request.send(form);
        
        request.onload = function() {
            if (request.status == 500) { // analyze HTTP status of the response
              alert(`DNI introducido ya existe en otro cliente. Introduce otro DNI.`); // e.g. 404: Not Found
            } else if(request.status != 200)
                alert(`Error ${request.status}: ${request.statusText}`); // e.g. 404: Not Found
            else { // show the result
                //refresh page
                location = location
                //SERIA MES RAPID SI ENLLOC DE REFRESCAR TOT ES PASES DIRECTAMENT LES DADES QUE HEM AFEGIT
                // PERO ya he invertido muchas horas a esto :(
            }
          };
     
      
    }
    //console.log(JSON.stringify(jeison))
    //console.log(form.getAll())
    
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
                <TextInput
                    type='number'
                    label="Telefono"
                    placeholder="123456789"
                    variant="default"
                    value={cliente.telefono}
                    onChange={(event) => setCliente({...cliente, telefono: event.target.value})}
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