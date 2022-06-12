import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical, Trash } from 'tabler-icons-react';
import Link from 'next/link';
import { ClientesData } from '../pages/admin/clientes';

// { id ,reservante ,matricula, estacion,nPlaza, date,duration, kwh, money } : ReservaRowProps, handleDeleteClick:any



const ClientesRow = (props: any) => {

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
        borrarElemento(cliente.id)
    }

    return (
        <tr>
            <td>{cliente.nombre}</td>
            <td>{cliente.apellido}</td>
            <td>{cliente.dni}</td>
            <td>{cliente.email}</td>
            {/* <td> 
                <Menu control={
                    <Center  style={{ width: 10, height: 40 }}>
                        <ActionIcon color="dark" radius="md">
                            <DotsVertical />
                        </ActionIcon>
                    </Center>
                    }>
                    <Link href={`/admin/reservas/${reserva.id}`}  passHref={true}>
                            <Menu.Item>Editar</Menu.Item>
                        </Link>
                    <Menu.Item color={'red'} onClick={handleDelete}icon={<Trash size={14}/>} >Eliminar</Menu.Item> 
                </Menu>
            </td>       */}
        </tr>
    );
} 
export default ClientesRow