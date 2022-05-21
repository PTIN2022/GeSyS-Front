import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical, Search } from 'tabler-icons-react';
import Link from 'next/link';
import { useState } from 'react';

import { PromoData } from '../pages/admin/promociones';

// Hecho por xdiban, pero lo he tenido que subir yo porque hubo un error

const PromoRow = ({ id_promo, descuento, fecha_inicio, fecha_fin, estado, descripcion } : PromoData) => {
    const [Activado,setActivado] = useState<boolean>(estado);

    return (    
        <tr>
            <td>{id_promo}</td>
            {/* <td>{Est}</td> */}
            <td>{descuento}</td>
            {/* <td>{Cupones}</td> */}
            <td>{fecha_inicio}</td>
            <td>{fecha_fin}</td>
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
                <Link href={`http://localhost:3000/admin/promociones/${id_promo}`} passHref={true}>
                  <Menu.Item>Editar</Menu.Item> 
                </Link>
            </Menu>
        </tr>
    )
} 
export default PromoRow