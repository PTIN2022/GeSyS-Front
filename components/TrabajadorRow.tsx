import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical } from 'tabler-icons-react';
import { Avatar } from '@mantine/core';
import Link from 'next/link';
import { TrabajadorRowProps } from '../pages/admin/trabajadores';

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
                    <Link href={"/admin/perfil"} passHref={true}>
                      <Menu.Item>
                        Editar
                      </Menu.Item> 
                    </Link>
                    <Menu.Item color={'yellow'}>Suspender</Menu.Item> 
                    <Menu.Item color={'red'}>Eliminar</Menu.Item>
                </Menu>
            </td>
            
        </tr>
        </>
    )
} 
export default TrabajadorRow