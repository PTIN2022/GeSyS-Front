import { NextPage } from 'next';
import Head  from 'next/head'
import { Table } from '@mantine/core'
import { ReservaRowProps } from '../../../interfaces';
import ReservaRow from '../../../components/ReservaRow';


import { forwardRef, useState } from 'react';
import { Group, Avatar, Text, MantineColor, SelectItemProps, Autocomplete } from '@mantine/core';
import Estacion from '../estaciones/[estacion]';


const elements: ReservaRowProps[] = [
  {
    reservante: "antonio@gmail.com",
    matricula: "4444 AAA",
    estacion: 'VG1',
    date: "18/03/22-11:30",
    duration: '2h',
    kwh: "30",
    money: 70
  },
  {
    reservante: "manuel@gmail.com",
    matricula: "5555 BBB",
    estacion: 'VG2',
    date: "25/03/22-13:30",
    duration: '1h',
    kwh: "50",
    money: 90
  },
  {
    reservante: "griezman@gmail.com",
    matricula: "7777 CCC",
    estacion: 'VG3',
    date: "04/04/22-11:00",
    duration: '2.5h',
    kwh: "40",
    money: 80
  },
];


//const data = charactersList.map((item) => ({ ...item, value: item.label }));
const data = elements.map((item) => ({ ...item, value: item.estacion }));



const reservas: NextPage = () => {
  const [value, setValue] = useState('');  
    return (
      <>
      <Head>
        <title>GeSyS - Reservas</title>
      </Head> 
        <h1>Reservas</h1>
    <Autocomplete
      label="Elige la estación a filtrar"
      placeholder="Pick one"
      //data={data}
      value={value} onChange={setValue} data={data}      
      filter={(value, item) =>
        item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.reservante.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
    
      <Table striped highlightOnHover >
        <thead>
          <tr>
            <th>Reservante</th>
            <th>Matricula</th>
            <th>Estacion</th>
            <th>Fecha</th>
            <th>Duracion</th>
            <th>KwH</th>
            <th>Coste</th>        
          </tr>       
        </thead>
        <tbody>
        {elements && elements.filter(element => element.estacion.includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index} {...elementFiltrat}/>
        })}
        </tbody>
      </Table>
    </> 
    )
  }
  
  export default reservas
  