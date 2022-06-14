import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical, Trash } from 'tabler-icons-react';
import { AveriaRowProps } from '../pages/admin/averias';


// Hecho por xdiban, pero lo he tenido que subir yo porque hubo un error

const AveriaRow = (props: any) => {
    const averia: AveriaRowProps = props.averia;
    const EliminarAveria: (id_averia: number) => {} = props.deleteElement;
    const handleDelete = async () => {
        const borrar = confirm('¿Estás seguro de que quieres eliminar la averia?')
        if (!borrar) {
          return;
        }
        try{
            const response = await fetch(`https://craaxkvm.epsevg.upc.es:23600/api/incidencias/${averia.id_averia}`, {
                "method": "DELETE",
                "headers": {
                    "accept": "application/json",
                  },
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
        alert ("Unaible to delete:" + err)
       }
    }



    //const [Estado,setEstado] = useState<string>(State)
    return (        
        <tr>
            <td>{averia.Est}</td>
            <td>{averia.Date}</td>
            <td>{averia.State}</td>
            <td>{averia.Desc}</td>
            {<td>
            <Menu control={
                <Center  style={{ width: 10, height: 40 }}>
                    <ActionIcon color="dark" radius="md">
                        <DotsVertical />
                    </ActionIcon>
                </Center>
                }>
                {/*
                <Link href={""} passHref={true}>
                  <Menu.Item>Ver más</Menu.Item> 
                </Link>*/
                }
                <Menu.Item color={'red'} onClick={handleDelete}icon={<Trash size={14}/>} >Eliminar</Menu.Item> 
            </Menu>
            </td>}
        </tr>
    );
}
export default AveriaRow