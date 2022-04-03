import { PromoRowProps } from '../interfaces'
import { Menu, Center, ActionIcon } from '@mantine/core';
import { Adjustments, InfoSquare,  DotsVertical, Search } from 'tabler-icons-react';
import Link from 'next/link';

const PromoRow = ({ Est,Descuento, Cupones,Fecha_ini,Fecha_fin } : PromoRowProps) => {
    return (        
        <tr>
            <td>{Est}</td>
            <td>{Descuento}</td>
            <td>{Cupones}</td>
            <td>{Fecha_ini}</td>
            <td>{Fecha_fin}</td>
            <Menu control={
                <Center  style={{ width: 10, height: 40 }}>
                    <ActionIcon color="dark" radius="md">
                        <DotsVertical />
                    </ActionIcon>
                </Center>
                }>
                <Menu.Item >Activar</Menu.Item> 
                <Menu.Item >Desactivar</Menu.Item> 
                <Link href={"/admin/promocion/1"} passHref={true}>
                  <Menu.Item>Más</Menu.Item> 
                </Link>
            </Menu>
        </tr>
    )
} 
export default PromoRow