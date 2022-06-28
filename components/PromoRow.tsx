import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical, Search } from 'tabler-icons-react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import { PromoData } from '../pages/admin/promociones';
import { AuthContext } from '../contexts/AuthContext';

// Hecho por xdiban, pero lo he tenido que subir yo porque hubo un error

const PromoRow = ({ id_promo, descuento, fecha_inicio, fecha_fin, descripcion, id_estacion } : PromoData) => {
     const { requestAuthenticated } = useContext(AuthContext)

      const handleChangeEstado = async () => {
        const form = new FormData();
        const result = await requestAuthenticated(`http://craaxkvm.epsevg.upc.es:23601/api/promociones/${id_promo}/estacion`)
        const data = await result.json();
        // console.log("hola")
        // console.log(data)
      //  fetch(`http://craaxkvm.epsevg.upc.es:23601/api/promociones/${id_promo}`, {
      //    "method": "PUT",
      //    "body": form,
      //    "headers": {
      //      "accept": "application/json"
      //    }
      //  })
      //  .then(response => {
      //    if (response.status === 200) {
      //      setActivado(!Activado);
      //    }
      //  })
      //  .catch(err => {
      //    console.error(err);
      //  });

     }
     useEffect(() => {
      handleChangeEstado();
    }, [])

    return (    
        <tr>
            <td>{id_promo}</td>
            <td>{id_estacion}</td>
            {/* <td>{Est}</td> */}
            <td>{descuento}</td>
            {/* <td>{Cupones}</td> */}
            <td>{fecha_inicio}</td>
            <td>{fecha_fin}</td>
            {/* <td style={Activado ? {color: 'green'} : {color: 'red'}}>{
              Activado ? 
              'Activado'
               : 
              'Desactivado'
            }</td> */}
            <td>
            <Menu control={
                <Center  style={{ width: 10, height: 40 }}>
                    <ActionIcon color="dark" radius="md">
                        <DotsVertical />
                    </ActionIcon>
                </Center>
                }>
                <Menu.Item
                //     onClick={handleChangeEstado}
                 >
                Activar
                     {/* {Activado ? "Desactivar": "Activar"} */}
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

