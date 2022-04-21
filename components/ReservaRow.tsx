import { ReservaRowProps } from '../interfaces'
import { Menu, Center, ActionIcon } from '@mantine/core';
import { Adjustments, InfoSquare,  DotsVertical, Search, Trash } from 'tabler-icons-react';
import Link from 'next/link';
import reserva from '../pages/admin/reservas/[reserva]';
import reservas from '../pages/admin/reservas/index'



const RerservaRow = ({ id ,reservante ,matricula, estacion,nPlaza, date,duration, kwh, money } : ReservaRowProps) => {
    return (        
        <tr>
            <td>{reservante}</td>
            <td>{matricula}</td>
            <td>{estacion}</td>
            <td>{nPlaza}</td>
            <td>{date}</td>
            <td>{duration}</td>
            <td>{kwh}</td>
            <td>{money}</td>  
            <td> 
                <Menu control={
                    <Center  style={{ width: 10, height: 40 }}>
                        <ActionIcon color="dark" radius="md">
                            <DotsVertical />
                        </ActionIcon>
                    </Center>
                    }>
                    <Link href={{pathname:"/admin/reservas/[reserva]",query:{reserva:'{id}'},}}  passHref={true}>
                            <Menu.Item>Editar</Menu.Item>
                        </Link>
                    <Menu.Item color={'red'} onClick={() => handleDeleteClick}icon={<Trash size={14}/>} >Eliminar</Menu.Item> 
                </Menu>
            </td>      
        </tr>
    )
} 
export default RerservaRow