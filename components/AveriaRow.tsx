import { AveriaRowProps } from '../interfaces'
import { Menu, Center, ActionIcon } from '@mantine/core';
import { Adjustments, InfoSquare,  DotsVertical, Search } from 'tabler-icons-react';
import Link from 'next/link';
import { useState } from 'react';

const AveriaRow = ({ Est,Dir, Date,State,Desc } : AveriaRowProps) => {
    const [Estado,setEstado] = useState<string>(State)
    return (        
        <tr>
            <td>{Est}</td>
            <td>{Dir}</td>
            <td>{Date}</td>
            <td>{State}</td>
            <td>{Desc}</td>
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
        </tr>
    )
} 
export default AveriaRow