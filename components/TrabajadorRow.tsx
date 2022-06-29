import { Menu, Center, ActionIcon, UnstyledButton } from '@mantine/core';
import { DotsVertical } from 'tabler-icons-react';
import { Avatar } from '@mantine/core';
import Link from 'next/link';
import { TrabajadorRowProps } from '../pages/admin/trabajadores';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import PerfilTrabajador from '../pages/admin/trabajadores/[trabajador]';
import { AuthContext } from '../contexts/AuthContext';
import { PerfilData } from '../pages/admin/perfil';



//({ dni, nombre, cargo, ultimo_acceso, foto } : TrabajadorRowProps)
const TrabajadorRow = (props: any) => {
  const [MenuOpened,setMenu] = useState(false)
  const { requestAuthenticated } = useContext(AuthContext)
  const trabajador: TrabajadorRowProps = props.trabajador;
    //const [promocionObj, setPromocion] = useState<TrabajadorRowProps | null>(null)
    const router = useRouter();
    
    const handleBorrarPromocion = async () => {

        const seguro = confirm('¿Estás seguro de que quieres borrar este trabajador?')

        if (!seguro) {
          return;
        }

        const response = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/trabajador/${trabajador.dni}`,"", {

          "method": "DELETE",
        })

        if (response.status == 200) {
            router.push('/admin/trabajadores') 
            window.location.reload();
          }
        else {
          alert('Error al borrar el trabajador')
        }
      }
      const tancaMenu=()=>{
        setMenu(!MenuOpened)
      }
      const acceso = new Date(trabajador.ultimo_acceso);
      const fecha = new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(acceso);
      trabajador.foto = `https://ui-avatars.com/api/?name=${trabajador.nombre}`
      return ( 
        <>
        <tr>
            <td><Avatar src={trabajador.foto}/>                 
            </td> 
            <td>{trabajador.dni}</td>
            <td>{trabajador.nombre}</td>
            <td>{trabajador.cargo}</td>
            <td>{fecha}</td>
            <td>
                <Menu opened={MenuOpened} control={
                    <Center  style={{ width: 10, height: 40 }}>
                        <ActionIcon onClick={() => setMenu(!MenuOpened)} color="dark" radius="md">
                            <DotsVertical />
                        </ActionIcon>
                    </Center>
                    }>
                      <Link href={`/admin/trabajadores/${trabajador.dni}`}  passHref={true}>
                        <Menu.Item>Ver más</Menu.Item>
                      </Link>
                    
                    <Menu.Item color={'yellow'}>Suspender</Menu.Item>
                  
                    <Menu.Item color={'red'} onClick={handleBorrarPromocion}>
                        Eliminar
                    </Menu.Item>
                </Menu>
            </td>
            
        </tr>
        </>
    )
} 
export default TrabajadorRow
