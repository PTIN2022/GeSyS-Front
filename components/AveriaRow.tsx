import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical, Trash } from 'tabler-icons-react';
import { AveriaRowProps } from '../pages/admin/averias';
import React, { useEffect, useState } from 'react';
import Link from "next/link"

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';


// Hecho por xdiban, pero lo he tenido que subir yo porque hubo un error

const AveriaRow = (props: any) => {

    const { requestAuthenticated } = useContext(AuthContext)
    const averia: AveriaRowProps = props.averia;
    const EliminarAveria: (id_averia: number) => {} = props.deleteElement;
    const handleDelete = async () => {
        const borrar = confirm('¿Estás seguro de que quieres eliminar la averia?')
        if (!borrar) {
          return;
        }
        try{
            const response = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/incidencias/${averia.id_averia}`,"application/json", {
                "method": "DELETE"
            })
            if (response.status == 200) {
                EliminarAveria(averia.id_averia)
            }
            else {
                throw response.json();
            }
        }
       catch (err){
        //alert('Error! -> No se ha podido eliminar')
        alert ("Unable to delete:" + err)
       }
    }
    //const [Estado,setEstado] = useState<string>(averia.State)

    
    const [Estado,setEstado] = useState((averia.State));

    const hadleChangeEstado = (Estado_1: any)=>{
        setEstado(Estado_1)

        const jeison= {
            "estado": averia.State
          }
        const fetchData = async () => {
            const response = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/incidencias/${averia.id_averia}`, "application/json", {
              method: "PUT",
              body: JSON.stringify(jeison)          
            })
          }
          fetchData()
          console.log(jeison)
    }
    return (        
        <tr>
            <td>{averia.Est}</td>
            <td>{averia.Date}</td>
            <td>{Estado}</td>
            <td>{averia.Desc}</td>
            {<td>
            <Menu control={
                <Center  style={{ width: 10, height: 40 }}>
                    <ActionIcon color="dark" radius="md">
                        <DotsVertical />
                    </ActionIcon>
                </Center>
                }>
                <Link href={`http://localhost:3000/admin/averias/byname/${averia.Est}`}  passHref={true}>
                  <Menu.Item>Ver más</Menu.Item>
                </Link>
                <Menu.Item
                    onClick={() => hadleChangeEstado("No resuelto")}
                >
                No Resuelto
                </Menu.Item>
                <Menu.Item
                    onClick={() => hadleChangeEstado("Pendiente")}
                >
                Pendiente
                </Menu.Item> 
                <Menu.Item
                    onClick={() => hadleChangeEstado("Resuelto")}

                >
                Resuelto
                </Menu.Item> 

                <Menu.Item color={'red'} onClick={handleDelete}icon={<Trash size={14}/>} >Eliminar</Menu.Item> 
            </Menu>
            </td>}
        </tr>
    );
}
export default AveriaRow
/*
<Menu.Item
onClick={() => setEstado("No Resuelto")}
>
No Resuelto
</Menu.Item>
<Menu.Item
    onClick={() => setEstado("Pendiente")}
>
Pendiente
</Menu.Item> 
<Menu.Item
    onClick={() => setEstado("Resuelto")}
>
Resuelto
</Menu.Item> 

{<Menu.Item
    onClick={hadleChangeEstado}
>
    { Estado ? "Resuelto": "No Resuelto"}
</Menu.Item> }
*/