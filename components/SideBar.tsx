import Link from 'next/link';
import React from 'react';

function SideBar() {
  return (
    <nav className="sidebar">
     
      <ul>
        <h2 className='sidebar-title'>Opciones de Administrador</h2>
        <li className='sidebar-text'><Link href="/Admin/Estaciones">Estaciones</Link></li>
        <li className='sidebar-text'><Link href="/Admin/Trabajadores">Trabajadores</Link> </li>
        <li className='sidebar-text'><Link href="/Admin/Promociones">Promociones</Link> </li>
        <li className='sidebar-text'><Link href="/Admin/Averias">Averías</Link> </li>
        <li className='sidebar-text'><Link href="/Admin/SoporteTecnico">Soporte Técnico</Link> </li>
      </ul>
    </nav>
  )
}

export default SideBar;