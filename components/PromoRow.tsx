import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical } from 'tabler-icons-react';
import Link from 'next/link';
import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';



const PromoRow = (props : any) => {
  const { id_promo, descuento, fecha_inicio, fecha_fin, descripcion, id_estacion } = props.promo
     const { requestAuthenticated } = useContext(AuthContext)

      const handleChangeEstado = async () => {
        //const form = new FormData();
        const response = await requestAuthenticated(`http://craaxkvm.epsevg.upc.es:23601/api/promociones/${id_promo}/${id_estacion}/activar`, "", {
              method: "PUT",
              //body: JSON.stringify(jeison)          
            })
     }


    const Activar_promo = () => {
      handleChangeEstado();
      props.triggerReload();
    }
        const auxFini = new Date(fecha_inicio);
        const auxFfin = new Date(fecha_fin);
        const fechaini = new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(auxFini);
        const fechafin = new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(auxFfin);
    return (    
        <tr>
            <td>{id_promo}</td>
            <td>{id_estacion}</td>
            {/* <td>{Est}</td> */}
            <td>{descuento}</td>
            {/* <td>{Cupones}</td> */}
            <td>{fechaini}</td>
            <td>{fechafin}</td>
            <td>
            <Menu control={
                <Center  style={{ width: 10, height: 40 }}>
                    <ActionIcon color="dark" radius="md">
                        <DotsVertical />
                    </ActionIcon>
                </Center>
                }>
                <Menu.Item
                  onClick={Activar_promo}
                 >
                Activar
                </Menu.Item> 
                <Link href={`http://localhost:3000/admin/promociones/${id_promo}`} passHref={true}>
                  <Menu.Item>Editar</Menu.Item> 
                </Link>
            </Menu>
            </td>
        </tr>
    )
} 
export default PromoRow

