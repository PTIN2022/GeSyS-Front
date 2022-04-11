import { NextPage } from 'next';
import Head  from 'next/head'
import { Table } from '@mantine/core'
import { ReservaRowProps } from '../../../interfaces';
import ReservaRow from '../../../components/ReservaRow';
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



const reservas: NextPage = () => {
    return (
      <>
      <Head>
        <title>GeSyS - Reservas</title>
      </Head> 
        <h1>Reservas</h1>   
      <Table striped highlightOnHover>
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
        {elements && elements.map((element, index) => {
          return <ReservaRow key={index} {...element}/>
        })}
        </tbody>
      </Table>
    </> 
    )
  }
  
  export default reservas
  