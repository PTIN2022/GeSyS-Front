import { TrabajadorRowProps } from '../interfaces'
import { Menu, Center, ActionIcon } from '@mantine/core';
import { Adjustments, InfoSquare,  DotsVertical, Search } from 'tabler-icons-react';
import { Avatar } from '@mantine/core';
import Link from 'next/link'

const TrabajadorRow = ({ Name,Rol, Last_access, Foto } : TrabajadorRowProps) => {
    return ( 
        <>
        <tr>
            <td><Avatar src={Foto}/>                
            </td>
            
            <td>{Name}</td>
            <td>{Rol}</td>
            <td>{Last_access}</td>
            <td>
                <Menu control={
                    <Center  style={{ width: 10, height: 40 }}>
                        <ActionIcon color="dark" radius="md">
                            <DotsVertical />
                        </ActionIcon>
                    </Center>
                    }>
                    <Menu.Item component="a" href="/perfil">
                        Editar</Menu.Item> 
                    <Menu.Item color={'yellow'}>Suspender</Menu.Item> 
                    <Menu.Item color={'red'}>Eliminar</Menu.Item>
                </Menu>
            </td>
            
        </tr>
        </>
    )
} 
export default TrabajadorRow