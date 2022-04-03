import type { NextPage } from 'next'
import Link from 'next/link'
import TrabajadorRow from '../../../components/TrabajadorRow';
import { Table } from '@mantine/core'
import { url } from 'inspector';
const elements = [
    {Name: "Sergio Sanchez", Rol: "Boss",Last_access: 'Connected', 
Foto: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg"},
    {Name: "Alfredo Manresa", Rol: "Admin",Last_access: '30m',
Foto: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"},
    {Name: "Marc Capdevila", Rol: "Admin",Last_access: '1h',
Foto: "https://dp.profilepics.in/profile_pictures/cristiano-ronaldo/cristiano-ronaldo-dp-profile-pics-for-whatsapp-facebook-51.jpg"},
    {Name: "Eduardo Pinto", Rol: "Worker",Last_access: 'Connected',
Foto:{}}
  ]; 
const ListaTrabajadores: NextPage = () => {
  return (
    <>
    <h1>Trabajadores</h1>
    <Link href="/">Home</Link>
    <Table striped highlightOnHover>
        <thead>
            <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Ultimo Acceso</th>       
            </tr>       
        </thead>
        <tbody>
        {elements && elements.map((element, index) => {
                return <TrabajadorRow {...element}/>
            })}
        </tbody>
    </Table>
    </>
  )
}

export default ListaTrabajadores