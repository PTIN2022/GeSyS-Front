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
    date: ('2020-01-01'),
    duration: "2h",
    kwh: "30",
    money: 70
  },
  {
    id:2,
    reservante: "paco",
    matricula: "5555 AAA",
    estacion: 'VG1',
    nPlaza: 3,
    date: ('2020-01-02'),
    duration:"3h",
    kwh: "30",
    money: 70
  },
  {
    id:3,
    reservante: "antonio",
    matricula: "6666 AAA",
    estacion: 'VG2',
    nPlaza: 10,
    date: ('2020-01-01'),
    duration:"1.5h",
    kwh: "40",
    money: 70
  }
];


//const data = charactersList.map((item) => ({ ...item, value: item.label }));
const filtres = [{filtre:"Estación"},{filtre:"Cliente"},{filtre:"Matricula"},{filtre:"KwH"},{filtre:"Date"}];
const dataFilters = filtres.map((item) => ({...item, value: item.filtre}));
var dataE = elements.map((item:any) => ({ ...item, value: item.estacion })) ;
const dataC = elements.map((item:any) => ({ ...item, value: item.reservante }));
const dataM =  elements.map((item) => ({...item, value: item.matricula}));
const datak =  elements.map((item) => ({...item, value: item.kwh}));
const dataD =  elements.map((item) => ({...item, value: item.date}));

//const [elementsD,setElements]  = useState<any>(elements[0]);


const handleDeleteClick = (idReserva:any) => {
  const newReservas = {...elementsD};
  const index = elementsD.findIndex((elementsD:any) => elementsD.id === idReserva);
  newReservas.splice(index, 1);
  setElements(newReservas);
}
const reservas: NextPage = () => {

  
  const [value, setValue] = useState('');  
  const [filtre, setFilter] = useState(''); 
  ///////////////////DINAMICAMENTE////////////////////////
  const [elementsD,setElements]  = useState<any>(elements[0]);
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/api/reservas");
    const data =  await response.json();
   
    setElements(data)
}
fetchData();

}, [])



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
            value={filtre} onChange={setFilter}   data={dataFilters}      
            filter={(filtre, item) =>
              item.filtre.toLowerCase().includes(filtre.toLowerCase().trim())        }
          />
        </Grid.Col>
        {filtre == "" && value && setValue("")}          

        {filtre=="Estación" && <Grid.Col span={6}>        
          <Autocomplete
            label="Elemento a filtrar:"
            placeholder="Pick one"
            //data={data}
            value={value} onChange={setValue} data={dataE}      
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
            value={value} onChange={setValue} data={dataC}      
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
            value={value} onChange={setValue} data={dataM}      
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
            value={value} onChange={setValue} data={datak}      
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
            value={value} onChange={setValue} data={dataD}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
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
        {filtre =="" && elements && elements.filter(element => element.estacion.includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index} {...elementFiltrat}/>
        })}        
        {filtre =="Estación" && elements && elements.filter(element => element.estacion.includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index} {...elementFiltrat}/>
        })}  
        {filtre =="Cliente" && elements && elements.filter(element => element.reservante.includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index} {...elementFiltrat}/>
        })} 
        {filtre =="Matricula" && elements && elements.filter(element => element.matricula.includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index} {...elementFiltrat}/>
        })} 
        {filtre =="KwH" && elements && elements.filter(element => element.kwh.includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index} {...elementFiltrat}/>
        })} 
        {filtre =="Date" && elements && elements.filter(element => element.date.includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index} {...elementFiltrat}/>
        })}    
        </tbody>
      </Table>
    </> 
    )
  }
  
  export default reservas
  