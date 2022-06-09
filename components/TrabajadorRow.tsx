import { Menu, Center, ActionIcon, UnstyledButton } from '@mantine/core';
import { DotsVertical } from 'tabler-icons-react';
import { Avatar } from '@mantine/core';
import Link from 'next/link';
import { TrabajadorRowProps } from '../pages/admin/trabajadores';
import { useState } from 'react';
import { useRouter } from 'next/router';
//import { PerfilData } from '../pages/admin/perfil';

const TrabajadorRow = ({ Dni, Name,Rol, Last_access, Foto } : TrabajadorRowProps) => {
    
    //const [promocionObj, setPromocion] = useState<TrabajadorRowProps | null>(null)
    const router = useRouter();
    const handleBorrarPromocion = () => {

        const seguro = confirm('¿Estás seguro de que quieres borrar este trabajador?')
    
        if (!seguro) {
          return;
        }
        
        fetch(`https://craaxkvm.epsevg.upc.es:23600/api/trabajador/${Dni}`, {
          "method": "DELETE",
          "headers": {
            "accept": "application/json"
          }
        })
        .then(response => {
          if (response.ok) {
            router.push('/admin/trabajadores')
          }
        })
        .catch(err => {
          alert('Error al borrar el trabajador')
        });
    
      }
    return ( 
        <>
        <tr>
            <td><Avatar src={Foto}/>                
            </td>
            <td>{Dni}</td>
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
                    <UnstyledButton onClick={handleBorrarPromocion}>
                        <Menu.Item color={'red'}>
                            Eliminar
                        </Menu.Item>
                    </UnstyledButton>
                </Menu>
            </td>
            
        </tr>
        </>
    )
} 
export default TrabajadorRow