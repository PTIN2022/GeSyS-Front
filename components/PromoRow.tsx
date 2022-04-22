import { PromoRowProps } from '../interfaces'
import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical, Search } from 'tabler-icons-react';
import Link from 'next/link';
import { useState } from 'react';

const PromoRow = ({ Est,Descuento, Cupones,Fecha_ini,Fecha_fin,Estado } : PromoRowProps) => {
    const [Activado,setActivado] = useState<boolean>(Estado)

    return (    
        <tr>
            <td>{Est}</td>
            <td>{Descuento}</td>
            <td>{Cupones}</td>
            <td>{Fecha_ini}</td>
            <td>{Fecha_fin}</td>
            <td style={Activado ? {color: 'green'} : {color: 'red'}}>{
              Activado ? 
              'Activado'
               : 
              'Desactivado'
            }</td>
            <Menu control={
                <Center  style={{ width: 10, height: 40 }}>
                    <ActionIcon color="dark" radius="md">
                        <DotsVertical />
                    </ActionIcon>
                </Center>
                }>
                <Menu.Item
                    onClick={() => setActivado(!Activado)}
                >
                    {Activado ? "Desactivar": "Activar"}
                </Menu.Item> 
                <Link href={"/admin/promociones/1"} passHref={true}>
                  <Menu.Item>Editar</Menu.Item> 
                </Link>
            </Menu>
        </tr>
    )
} 
export default PromoRow