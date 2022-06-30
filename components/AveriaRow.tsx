import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical, Trash } from 'tabler-icons-react';
import { AveriaRowProps } from '../pages/admin/averias';
import React, { useEffect, useState } from 'react';
import Link from "next/link"
import Edit_Averia from './Edit_Averia';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';



// Hecho por xdiban, pero lo he tenido que subir yo porque hubo un error

const AveriaRow = (props: any) => {
    //editar averia

    const [MenuOpened,setMenu] = useState(false)
    const [averia,setIncidencia] = useState<AveriaRowProps>(props.averia);
    useEffect(()=>{
        setIncidencia(props.averia)
    },[props])
    const  refreshIncidencia = (newIncidencia:AveriaRowProps)=>{
        if (newIncidencia != undefined){
            setIncidencia(newIncidencia)
        }
    }
    //

    const { requestAuthenticated } = useContext(AuthContext)
    //const averia: AveriaRowProps = props.averia;
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
    const fecha_aux = new Date(averia.Date!);
    const fecha = new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(fecha_aux);
        // editar averia
        const cerrarMenu=()=>{
            setMenu(!MenuOpened)
        }
        //editar averia
    return (        
        <tr>
            <td>{averia.Est}</td>
            <td>{fecha}</td>
            <td>{averia.State}</td>
            <td>{averia.Desc}</td>
            <td><Edit_Averia averia={averia} menu={cerrarMenu} update={refreshIncidencia}/></td>
            {<td>
            <Menu control={
                <Center  style={{ width: 10, height: 40 }}>
                    <ActionIcon color="dark" radius="md">
                        <DotsVertical />
                    </ActionIcon>
                </Center>
                }>

                <Link href={`/admin/averias/byname/${averia.Est}`}  passHref={true}>
                  <Menu.Item>Averias Estacion</Menu.Item>
                </Link>

                <Link href={`/admin/averias/byname2/${averia.id_averia}`}  passHref={true}>
                  <Menu.Item>Ver más</Menu.Item>
                </Link>

                <Menu.Item color={'red'} onClick={handleDelete}icon={<Trash size={14}/>} >Eliminar</Menu.Item> 
            </Menu>
            </td>}
        </tr>
    );
}
export default AveriaRow