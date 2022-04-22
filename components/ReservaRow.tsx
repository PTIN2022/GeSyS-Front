import { ReservaRowProps } from '../interfaces'
import { Menu, Center, ActionIcon } from '@mantine/core';
import { Adjustments, InfoSquare,  DotsVertical, Search, Trash } from 'tabler-icons-react';
import Link from 'next/link';
import ShowReserva from '../pages/admin/reservas/[reserva]';
import ListaReservas from '../pages/admin/reservas/index'

// { id ,reservante ,matricula, estacion,nPlaza, date,duration, kwh, money } : ReservaRowProps, handleDeleteClick:any


const RerservaRow = (props: any) => {

    const reserva: ReservaRowProps = props.reserva;
    const borrarElemento: (idReserva: number) => {} = props.deleteElement;

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
        borrarElemento(reserva.id)
    }

    return (
        <tr>
            <td>{reserva.reservante}</td>
            <td>{reserva.matricula}</td>
            <td>{reserva.estacion}</td>
            <td>{reserva.nPlaza}</td>
            <td>{reserva.date}</td>
            <td>{reserva.duration}</td>
            <td>{reserva.kwh}</td>
            <td>{reserva.money}</td>  
            <td> 
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
            </td>      
        </tr>
    )
} 
export default RerservaRow