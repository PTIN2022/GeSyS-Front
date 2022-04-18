import { AveriaRowProps } from '../interfaces'
import { Menu, Center, ActionIcon } from '@mantine/core';
import { Adjustments, InfoSquare,  DotsVertical, Search } from 'tabler-icons-react';
import Link from 'next/link';
const AveriaRow = ({ Est,Dir, Date,State,Desc } : AveriaRowProps) => {
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
                <Link href={""} passHref={true}>
                  <Menu.Item>Ver más</Menu.Item> 
                </Link>
            </Menu>
        </tr>
    )
} 
export default AveriaRow