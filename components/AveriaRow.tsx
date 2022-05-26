import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical } from 'tabler-icons-react';
import Link from 'next/link';
import { useState } from 'react';

import { AveriaRowProps } from '../pages/admin/averias';


// Hecho por xdiban, pero lo he tenido que subir yo porque hubo un error

const AveriaRow = ({ Est,Date,State,Desc } : AveriaRowProps) => {
    const [Estado,setEstado] = useState<string>(State)
    return (        
        <tr>
            <td>{Est}</td>
            <td>{Date}</td>
            <td>{Estado}</td>
            <td>{Desc}</td>
            <td>
            <Menu control={
                <Center  style={{ width: 10, height: 40 }}>
                    <ActionIcon color="dark" radius="md">
                        <DotsVertical />
                    </ActionIcon>
                </Center>
                }>
               <Menu.Item
                    onClick={() => setEstado("Resuelta")}
                >
                    Resuelta
                </Menu.Item>
                <Menu.Item
                    onClick={() => setEstado("Pendiente")}
                >
                    Pendiente
                </Menu.Item> 
                <Menu.Item
                    onClick={() => setEstado("En proceso")}
                >
                    En proceso
                </Menu.Item> 
                <Menu.Item
                    onClick={() => setEstado("No resuelta")}
                >
                    No resuelta
                </Menu.Item> 
                <Link href={""} passHref={true}>
                  <Menu.Item>Ver más</Menu.Item> 
                </Link>
            </Menu>
            </td>
            
        </tr>
    )
} 
export default AveriaRow