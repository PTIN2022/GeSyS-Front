import { Menu, Center, ActionIcon } from '@mantine/core';
import { DotsVertical, Trash } from 'tabler-icons-react';
import Link from 'next/link';
import { ReservaRowProps } from '../pages/admin/reservas';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// { id ,reservante ,matricula, estacion,nPlaza, date,duration, kwh, money } : ReservaRowProps, handleDeleteClick:any


const RerservaRow = (props: any) => {
  const { requestAuthenticated } = useContext(AuthContext)

    const reserva: ReservaRowProps = props.reserva;
    const borrarElemento: (idReserva: number) => {} = props.deleteElement;
    const router = useRouter();
    const handleBorrarPromocion = () => {

      const seguro = confirm('¿Estás seguro de que quieres borrar esta reserva?')
  
      if (!seguro) {
        return;
      }
      const DeleteData = async() =>{
        const response = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/reservas/${reserva.id}`,"", {
          "method": "DELETE"        
        })
        if (response.status == 200){
          location=location
        }
      }
      DeleteData()
      // .then(response => {
      //   if (response.ok) {
      //     router.push('/admin/reservas') 
      //     window.location.reload();
      //   }
      // })
      // .catch(err => {
      //   alert('Error al borrar la reserva')
      // });
  
    }


    return (
        <tr>
            <td>{reserva.id}</td>
            <td>{reserva.reservante}</td>
            <td>{reserva.matricula}</td>
            <td>{reserva.nPlaza}</td>
            <td>{reserva.date!.toLocaleDateString() +" "+ reserva.date?.getHours()+':'+reserva.date?.getMinutes() }</td>
            <td>{reserva.date_fin!.toLocaleDateString() +" "+ reserva.date_fin?.getHours()+':'+reserva.date_fin?.getMinutes()}</td>
            <td>{reserva.kwh}</td>
            <td>{reserva.money}</td>  
            <td> 
                <Menu control={
                    <Center  style={{ width: 10, height: 40 }}>
                        <ActionIcon color="dark" radius="md">
                            <DotsVertical />
                        </ActionIcon>
                    </Center>
                    }>
                    <Link href={`/admin/reservas/${reserva.id}`}  passHref={true}>
                            <Menu.Item>Editar</Menu.Item>
                        </Link>
                    <Menu.Item color={'red'} onClick={handleBorrarPromocion}icon={<Trash size={14}/>} >Eliminar</Menu.Item> 
                </Menu>
            </td>      
        </tr>
    );
} 
export default RerservaRow