import { PromoRowProps } from '../interfaces'
import { Menu, Center, ActionIcon } from '@mantine/core';
import { Adjustments, InfoSquare,  DotsVertical, Search } from 'tabler-icons-react';

const AveriaRow = ({ Est,Descuento, Cupones,Fecha_ini,Fecha_fin } : PromoRowProps) => {
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
                <Menu.Item component='a' href='../admin/info_promo'>Más</Menu.Item> 
            </Menu>
        </tr>
    )
} 
export default AveriaRow