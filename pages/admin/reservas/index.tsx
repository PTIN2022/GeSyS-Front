import { NextPage } from 'next';
import Head  from 'next/head'
import { Grid, Table, Text, Space, Title } from '@mantine/core'
import ReservaRow from '../../../components/ReservaRow';

import { useContext, useEffect, useState } from 'react';
import { Autocomplete } from '@mantine/core';
import AddReserva from '../../../components/AddReservas';
import { AuthContext } from '../../../contexts/AuthContext';
import { PerfilData } from '../perfil';

export interface ReservaRowProps{
  id: number; 
  reservante : string;
  matricula: string;
  estacion: string;
  nPlaza: number;
  date: Date | null;
  duration: number;
  //date_fin:  Date | null;
  kwh: number;
  money: number;
  city: string;
}

export interface Filter {
  name: string;
  value: string;
}

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
    money: 70,
    city: "Vilanova"
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
    money: 70,
    city: "Sitges"

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
    money: 70,
    city: "Mordor"
  }
];


//const data = charactersList.map((item) => ({ ...item, value: item.label }));
const allFilters: Filter[] = [
  {
    name:"Estación",
    value: "Estación"
  },
  {
    name:"Cliente",
    value: "Cliente"
  },
  {
    name:"Matricula",
    value: "Matricula"
  },
  {
    name:"KwH",
    value: "KwH"
  },
  {
    name:"Date",
    value: "Date"
  },
  {
    name:"Ciudad",
    value: "Ciudad"
  }
];


const ListaReservas: NextPage = () => {

  const [activeFilters, setActiveFilters] = useState<Filter[]>(allFilters);

  const { user, logout } = useContext(AuthContext);
  const [ profile, setProfile ] = useState<PerfilData>(user)
    //useEfect, cada vegada que user canvi de valor, que profile s'actualitzi
    useEffect(() => {
      setProfile(user!)
    }, [user])

    //useEfect, cada vegada que profile canvi de valor, que s'actualitzin els filtres
    useEffect(() => {
      if (profile.cargo.toLowerCase() == "trabajador") {
        const active = activeFilters.filter(element => {
          if (element.name.toLowerCase() !== 'ciudad' && element.name.toLowerCase() !== 'estación') {
            return element
          }
        })
        setActiveFilters(active);
      }
      else if( profile.cargo.toLowerCase() == "responsable"){
        const active = activeFilters.filter(element => {
          if (element.name.toLowerCase() !== 'ciudad') {
            return element
          }
        })
        setActiveFilters(active);
      }
      else {
        setActiveFilters(allFilters);
      }
    }, [profile])
/*******************************/
/* HACEMOS GET DE LAS RESERVAS */
/*******************************/
const [elementsD, setElements]  = useState<ReservaRowProps[]>();
    console.log("HOLA??")
    useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://craaxkvm.epsevg.upc.es:23601/api/reservas", {
        method:'GET',
        headers:{
          'accept': 'application/json'
        },
       //mode:'no-cors'
      });
      const data =  await response.json();

      const res = []

      for(let i=0; i<data.length; i++) {
        //const duration = data[i].fecha_entrada.toString().split("T",2)[2] - data[i].fecha_final.toString().split("T",2)[2]

        let est1:ReservaRowProps = {
          id: data[i].id_reserva,
          reservante: data[i].id_cliente,
          matricula: data[i].id_vehiculo,
          estacion: "VGA1",//data[i].id_estacion,
          city:"Vilanova",
          nPlaza: data[i].id_cargador,
          duration: 2,
          //date:data[i].fecha_entrada.toString().split("T",2)[1],
          //Dir: data[i].direccion,
          date: new Date (data[i].fecha_entrada), 
          kwh: 40,
          money: 10
        }
        res.push(est1)
      }
      setElements(res);
      console.log(data[0].fecha_entrada.toString().split("T",2)[1])
    }
    fetchData();
  }, []) 
  //si no somos admin eliminamos el filtro ciudad solo una vez

  

  const [value, setValue] = useState('');  
  const [filtre, setFilter] = useState(''); 
  ///////////////////DINAMICAMENTE////////////////////////

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
      <Title order={1}> <Text  inherit component="span">Reservas </Text></Title>
      <Space  h={25}/>

      {!profile ? (
        <div>Loading...</div>
      ) : 
      (
        <>
        <AddReserva />
      
      <Grid gutter="xl">
        <Grid.Col span={3}>
          <Autocomplete           
            label="Elige que filtrar"
            placeholder="Pick one"
            //data={data}
            value={filtre}
            limit={7}
            onChange={setFilter}
            data={activeFilters}
            onClick={() => setFilter("")}    
            filter={(filtre, item) => item.value.toLowerCase().includes(value.toLowerCase().trim())}
            />
        </Grid.Col>

        {filtre == "" && value && setValue("")}          

        {(profile.cargo == "Administrador" || profile.cargo=="Jefe") && filtre=="Ciudad" && <Grid.Col span={6}>        
          <Autocomplete
            label="Elemento a filtrar:"
            placeholder="Pick one"
            //data={data}
            value={value} onChange={setValue} data={elementsD.map((item) => ({ ...item, value: item.city}))}      
            filter={(value, item) =>
              item.value.toLowerCase().includes(value.toLowerCase().trim())
            }
          />

        </Grid.Col>   
        }
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
            value={value} onChange={setValue} data={elementsD.map((item) => ({...item, value: item.date!.toDateString()}))}      
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
            <th>Ciudad</th>
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
        {(profile.cargo == "Administrador" || profile.cargo=="Jefe") && filtre =="Ciudad" && elementsD && elementsD.filter(element => element.city.includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index}  reserva={elementFiltrat} deleteElement={handleDeleteClick}/>
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
        {filtre =="Date" && elementsD && elementsD.filter(element => element.date!.toDateString().includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index}  reserva={elementFiltrat} deleteElement={handleDeleteClick}/>
        })}
        </tbody>
      </Table>
      </>
      )}
      

    </> 
    )
  }
  
  export default ListaReservas



