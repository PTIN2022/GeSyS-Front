import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical, Search } from 'tabler-icons-react';
import Link from 'next/link';
import { useState } from 'react';

import { PerfilData, RolWorker } from '../pages/admin/perfil';


// Hecho por xdiban, pero lo he tenido que subir yo porque hubo un error

const ClientRow = ({ nombre, apellido, dni, email, username, telefono } : PerfilData) => {


    return (    
        <tr>
            <td>{nombre}</td>
            {/* <td>{Est}</td> */}
            <td>{apellido}</td>
            {/* <td>{Cupones}</td> */}
            <td>{dni}</td>
            <td>{email}</td>
            <td>{username}</td>
            <td>{telefono}</td>
            <Menu control={
                <Center  style={{ width: 10, height: 40 }}>
                    <ActionIcon color="dark" radius="md">
                        <DotsVertical />
                    </ActionIcon>
                </Center>
                }>
                <Link href={"clientes"} passHref={true}>
                  <Menu.Item>Editar</Menu.Item> 
                </Link>
                <Link href="clientes" passHref={true}>
                  <Menu.Item>Eliminar</Menu.Item> 
                </Link>
            </Menu>
        </tr>
    )
} 
export default ClientRow