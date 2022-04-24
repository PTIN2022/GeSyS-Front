import { NextPage } from 'next';
import Head  from 'next/head'
import { Grid, Table } from '@mantine/core'
import { ReservaRowProps } from '../../../interfaces';
import ReservaRow from '../../../components/ReservaRow';

import { forwardRef, useEffect, useState } from 'react';
import { Group, Avatar, Text, MantineColor, SelectItemProps, Autocomplete } from '@mantine/core';


const elements: ReservaRowProps[] = [
  {
    id:1,
    reservante: "manolo",
    matricula: "4444 AAA",
    estacion: 'VG1',
    nPlaza: 13,
    date: new Date(2020,1,1),
    duration: 2,
    kwh: 30,
    money: 70
  },
  {
    id:2,
    reservante: "paco",
    matricula: "5555 AAA",
    estacion: 'VG1',
    nPlaza: 3,
    date: new Date('2020-01-02'),
    duration:3,
    kwh: 30,
    money: 70
  },
  {
    id:3,
    reservante: "antonio",
    matricula: "6666 AAA",
    estacion: 'VG2',
    nPlaza: 10,
    date:new Date('2020-01-01'),
    duration: 1,
    kwh:40,
    money: 70
  }
];


//const data = charactersList.map((item) => ({ ...item, value: item.label }));
const filtres = [{filtre:"Estación"},{filtre:"Cliente"},{filtre:"Matricula"},{filtre:"KwH"},{filtre:"Date"}];
const dataFilters = filtres.map((item) => ({...item, value: item.filtre}));
/*const dataM =  elementsD.map((item) => ({...item, value: item.matricula}));
const datak =  elementsD.map((item) => ({...item, value: item.kwh.toString()}));
const dataD =  elementsD.map((item) => ({...item, value: item.date.toDateString()}));*/

//const [elementsD,setElements]  = useState<any>(elements[0]);



const ListaReservas: NextPage = () => {

  const [value, setValue] = useState('');  
  const [filtre, setFilter] = useState(''); 
  ///////////////////DINAMICAMENTE////////////////////////
  const [elementsD, setElements]  = useState<ReservaRowProps[]>(elements);

  /*useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/reservas");
      const data =  await response.json();
    
      setElements(data)
    }
    fetchData();
  }, []) */

  const handleDeleteClick = (idReserva: number) => {
    const tmp = [];
    for(let i = 0; i < elementsD.length; i++) {
      if (elementsD[i].id != idReserva) {
        tmp.push(elementsD[i]);
      }
    }
    setElements(tmp);
  }

///////////////////DINAMICAMENTE////////////////////////

  //const [data, setData] = useState('');  
  //{filtre == "Cliente" && {setData(elements.map((item:any) => ({ ...item, value: item.estacion })) }}
    return (
      <>
      <Head>
        <title>GeSyS - Reservas</title>
      </Head> 
      <h1>Reservas</h1>
      
      <Grid gutter="xl">
        <Grid.Col span={3}>
          <Autocomplete           
            label="Elige que filtrar"
            placeholder="Pick one"
            //data={data}
            value={filtre} onChange={setFilter} data={dataFilters}  onClick={() => setFilter("")}    
            filter={(filtre, item) =>
              item.filtre.toLowerCase().includes(filtre.toLowerCase().trim())}
          />
        </Grid.Col>
        {filtre == "" && value && setValue("")}          

        {filtre=="Estación" && <Grid.Col span={6}>        
          <Autocomplete
            label="Elemento a filtrar:"
            placeholder="Pick one"
            //data={data}
            value={value} onChange={setValue} data={elementsD.map((item) => ({ ...item, value: item.estacion }))}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />

        </Grid.Col>   
        }
        {filtre=="Cliente" && <Grid.Col span={6}>        
          <Autocomplete
            label="Elemento a filtrar:"
            placeholder="Pick one"
            //data={data}
            value={value} onChange={setValue} data={elementsD.map((item) => ({ ...item, value: item.reservante }))}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
        </Grid.Col>   
        }
        {filtre=="Matricula" && <Grid.Col span={6}>        
          <Autocomplete
            label="Elemento a filtrar:"
            placeholder="Pick one"
            //data={data}
            value={value} onChange={setValue} data={elementsD.map((item) => ({...item, value: item.matricula}))}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
        </Grid.Col>   
        }
        {filtre=="KwH" && <Grid.Col span={6}>        
          <Autocomplete
            label="Elemento a filtrar:"
            placeholder="Pick one"
            //data={data}
            value={value} onChange={setValue} data={elementsD.map((item) => ({...item, value: item.kwh.toString()}))}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />
        </Grid.Col>   
        }
        {filtre=="Date" && <Grid.Col span={6}>        
          <Autocomplete
            label="Elemento a filtrar:"
            placeholder="Pick one"
            //data={data}
            value={value} onChange={setValue} data={elementsD.map((item) => ({...item, value: item.date.toDateString()}))}      
            filter={(value, item) =>
              item.value.toString().toLowerCase().includes(value.toLowerCase().trim())
            }
          />
        </Grid.Col>   
        }
      </Grid>
     <br></br>    

      <Table striped highlightOnHover >
        <thead>
          <tr>
            <th>Reservante</th>
            <th>Matricula</th>
            <th>Estacion</th>
            <th>nºPlaza</th>
            <th>Fecha</th>
            <th>Duracion</th>
            <th>KwH</th>
            <th>Coste[€]</th>        
          </tr>       
        </thead>
        <tbody>      
        {filtre == "" && elementsD && elementsD.map(reserva => {
          return <ReservaRow key={reserva.id} reserva={reserva} deleteElement={handleDeleteClick} />
        })}
        {filtre =="Estación" && elementsD && elementsD.filter(element => element.estacion.includes(value)).map((reserva, index )=> {
          return <ReservaRow key={index} reserva={reserva} deleteElement={handleDeleteClick}/>
        })}  
        {filtre =="Cliente" && elementsD && elementsD.filter(element => element.reservante.includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index} reserva={elementFiltrat} deleteElement={handleDeleteClick}/>
        })} 
        {filtre =="Matricula" && elementsD && elementsD.filter(element => element.matricula.includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index}  reserva={elementFiltrat} deleteElement={handleDeleteClick}/>
        })} 
        {filtre =="KwH" && elementsD && elementsD.filter(element => element.kwh.toString().includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index}  reserva={elementFiltrat} deleteElement={handleDeleteClick}/>
        })} 
        {filtre =="Date" && elementsD && elementsD.filter(element => element.date.toDateString().includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index}  reserva={elementFiltrat} deleteElement={handleDeleteClick}/>
        })}
        </tbody>
      </Table>

    </> 
    )
  }
  
  export default ListaReservas
  