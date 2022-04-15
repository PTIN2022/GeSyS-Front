import { PromoRowProps } from '../interfaces'
import { Menu, Center, ActionIcon } from '@mantine/core';
import { Adjustments, InfoSquare,  DotsVertical, Search } from 'tabler-icons-react';
import Link from 'next/link';

const PromoRow = ({ Est,Descuento, Cupones,Fecha_ini,Fecha_fin,Estado } : PromoRowProps) => {
    let sEstado:string; 
    if (Estado==true)
        sEstado="Activar"
    else
        sEstado="Desactivar"
    return (    
        <tr>
            <td>{Est}</td>
            <td>{Descuento}</td>
            <td>{Cupones}</td>
            <td>{Fecha_ini}</td>
            <td>{Fecha_fin}</td>
            <td>{Estado}</td>
            <Menu control={
                <Center  style={{ width: 10, height: 40 }}>
                    <ActionIcon color="dark" radius="md">
                        <DotsVertical />
                    </ActionIcon>
                </Center>
                }>
                <Menu.Item >{sEstado}</Menu.Item> 
                <Link href={"/admin/promociones/1"} passHref={true}>
                  <Menu.Item>Editar</Menu.Item> 
                </Link>
            </Menu>
        </tr>
    )
} 
export default PromoRow