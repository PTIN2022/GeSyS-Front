import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical, Trash } from 'tabler-icons-react';
import Link from 'next/link';
import { ClientesData } from '../pages/admin/clientes';
import EditClient from './EditCliente';
import { useEffect, useState } from 'react';

// { id ,reservante ,matricula, estacion,nPlaza, date,duration, kwh, money } : ReservaRowProps, handleDeleteClick:any



const ClientesRow = (props: any) => {
    const [MenuOpened,setMenu] = useState(false)
    const cliente: ClientesData = props.cliente;
    const borrarElemento: (id: number) => {} = props.deleteElement;

    /*const handleDelete = async () => {
        const response = await fetch(`/api/reservas/${reserva.id}`, {
            method: 'DEL'
        })
        
        if (response.status == 200) {
            borrarElemento(reserva.id)
        }
        else {
            alert('Error!')
        }
    }*/

    const handleDelete = async () => {
        const seguro = confirm('¿Estás seguro de que quieres eliminar este cliente?')
        if (!seguro) {
          return;
        }
        //CONTINUE WITH THE DELETE
        try{
            const response = await fetch(`https://craaxkvm.epsevg.upc.es:23600/api/clientes/${cliente.id}`, {
                "method": "DELETE",
                "headers": {
                    "accept": "application/json",
                  },
            })
            if (response.status == 200) {
                borrarElemento(cliente.id)
            }
            else {
                throw response.json();
            }
        }
       catch (err){
        //alert('Error! -> No se ha podido eliminar')
        alert ("Unaible to delete:" + err)
       }
       
        
    }
    // var menu = false
    // useEffect(()=>{
    // setMenu(menu)
    // },[menu])
    const tancaMenu=()=>{
        setMenu(!MenuOpened)
    }
    return (
        <tr>
            <td>{cliente.nombre}</td>
            <td>{cliente.apellido}</td>
            <td>{cliente.dni}</td>
            <td>{cliente.email}</td>
            { <td> 
                <Menu  opened={MenuOpened} control={
                    <Center  style={{ width: 10, height: 40 }}>
                        <ActionIcon   onClick={() => setMenu(!MenuOpened)} color="dark" radius="md">
                            <DotsVertical />
                        </ActionIcon>
                    </Center>
                    }>
                    
                    <Menu.Item >
                        <EditClient cliente={cliente} menu={tancaMenu}/>
                    </Menu.Item>
                   
                    <Menu.Item color={'red'} onClick={handleDelete} icon={<Trash size={14}/>} >Eliminar</Menu.Item> 
                </Menu>
            </td>     
             
        }
        </tr>
    );
} 
export default ClientesRow