import { NextPage } from 'next';
import Head  from 'next/head'
import { Grid, Table, Text, Space, Title } from '@mantine/core'
import ReservaRow from '../../../components/ReservaRow';

import { useContext, useEffect, useState } from 'react';
import { Autocomplete } from '@mantine/core';
import AddReserva from '../../../components/AddReservas';
import { AuthContext } from '../../../contexts/AuthContext';
import { PerfilData } from '../perfil';
import { useRouter } from 'next/router';

export interface ReservaRowProps{
  id: number; //id_reserva
  reservante : string; //id_cliente
  matricula: string; //id_vehiculo
  nPlaza: number; //id_cargador
  date: Date | null; //duration: number;
  date_fin:  Date | null; //fecha_salida
  kwh: number; //precio_carga_actual
  money: number; //tarifa
  asistida: boolean;
  //estado: boolean;
  estado_pago: boolean;
  carga_completa: number,
  perc_carga: number, 
  //city: string;
  estacion: number; //id_estacion
  //fecha_entrada
  
}

export interface Filter {
  name: string;
  value: string;
}

const elements: ReservaRowProps[] = [
  // {
  //   id:1,
  //   reservante: "manolo",
  //   matricula: "4444 AAA",
  //   estacion: 'VG1',
  //   nPlaza: 13,
  //   date: new Date(2020,1,1),
  //   duration: 2,
  //   kwh: 30,
  //   money: 70,
  //   city: "Vilanova"
  // },
  // {
  //   id:2,
  //   reservante: "paco",
  //   matricula: "5555 AAA",
  //   estacion: 'VG1',
  //   nPlaza: 3,
  //   date: new Date('2020-01-02'),
  //   duration:3,
  //   kwh: 30,
  //   money: 70,
  //   city: "Sitges"

  // },
  // {
  //   id:3,
  //   reservante: "antonio",
  //   matricula: "6666 AAA",
  //   estacion: 'VG2',
  //   nPlaza: 10,
  //   date:new Date('2020-01-01'),
  //   duration: 1,
  //   kwh:40,
  //   money: 70,
  //   city: "Mordor"
  // }
];


//const data = charactersList.map((item) => ({ ...item, value: item.label }));
const allFilters: Filter[] = [
  // {
  //   name:"Estación",
  //   value: "Estación"
  // },
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
  // {
  //   name:"Ciudad",
  //   value: "Ciudad"
  // }
];


const ListaReservas: NextPage = () => {
  const { requestAuthenticated } = useContext(AuthContext)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile])

/*******************************/
/* HACEMOS GET DE LAS RESERVAS */
/*******************************/
const [elementsD, setElements]  = useState<ReservaRowProps[] >(elements);
    
  const fetchDatos = async () => {
    const result = await requestAuthenticated ('https://craaxkvm.epsevg.upc.es:23600/api/reservas')
    const data = await result.json();  

    const est = []

    for(let i=0; i<data.length; i++) {
      let est1:ReservaRowProps = {
        id: data[i].id_reserva,
        reservante: data[i].id_cliente,
        matricula: data[i].id_vehiculo,
        estacion: data[i].id_estacion,
        //city:"Vilanova",
        nPlaza: data[i].id_cargador,
        //duration: 2,
        //date: data[i].fecha_entrada.toString().split("T",2)[1],
        //Dir: data[i].direccion,
        date: new Date (data[i].fecha_entrada), 
        date_fin: new Date (data[i].fecha_salida), 
        kwh: data[i].tarifa, // data[i].precio_carga_actual,
        money: data[i].precio_carga_completa, //data[i].tarifa,
        asistida: data[i].asistida,
        //estado: data[i].estado,
        estado_pago: data[i].estado_pago,
        carga_completa: data[i].precio_carga_completa ,
        perc_carga: data[i].procetnaje_carga, 
      }
      est.push(est1)
    }
    setElements(est);
  };
useEffect(() => {
  fetchDatos();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
 
  const [value, setValue] = useState('');  
  const [filtre, setFilter] = useState(''); 
  ///////////////////ELIMINAR////////////////////////

  const handleDeleteClick = (idReserva: number) => {
    const tmp = [];
    for(let i = 0; i < elementsD.length; i++) {
      if (elementsD[i].id != idReserva) {
        tmp.push(elementsD[i]);
      }
    }
    setElements(tmp);
  }
  const actualitzareservas = (rList:ReservaRowProps[])=>{
    console.log("rlist:", rList)
    setElements(rList)
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
        <AddReserva reservaList={elementsD} refreshList={actualitzareservas} />
      
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
            filter={(filtre, item) => item.value.toString().toLowerCase().includes(value.toString().toLowerCase().trim())}
            />
        </Grid.Col>

        {filtre == "" && value && setValue("")}          

        {/*(profile.cargo == "Administrador" || profile.cargo=="Jefe") && filtre=="Ciudad" && <Grid.Col span={6}>        
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
          */}
        {/*filtre=="Estación" && <Grid.Col span={6}>        
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
          */}
        {filtre=="Cliente" && <Grid.Col span={6}>        
          <Autocomplete
            label="Elemento a filtrar:"
            placeholder="Pick one"
            //data={data}
            value={value} onChange={setValue} data={elementsD.map((item) => ({ ...item, value: item.reservante }))}      
            filter={(value, item) =>
              item.value.toString().toLowerCase().includes(value.toString().toLowerCase().trim())
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
            <th>ID</th>
            <th>Reservante</th>
            <th>Matricula</th>
            <th>nºPlaza</th>
            <th>Fecha</th>
            <th>Fecha Fin</th>
            <th>Tarifa</th>
            <th>Coste[€]</th>        
          </tr>       
        </thead>
        <tbody>
              
        {filtre == "" && elementsD.length>0 && elementsD.map(reserva => {
          return <ReservaRow key={reserva.id} reserva={reserva} deleteElement={handleDeleteClick} />
        })}
        {/*(profile.cargo == "Administrador" || profile.cargo=="Jefe") && filtre =="Ciudad" && elementsD && elementsD.filter(element => element.city.includes(value)).map((elementFiltrat, index )=> {
          return <ReservaRow key={index}  reserva={elementFiltrat} deleteElement={handleDeleteClick}/>
        })*/}
        {/*filtre =="Estación" && elementsD && elementsD.filter(element => element.estacion.includes(value)).map((reserva, index )=> {
          return <ReservaRow key={index} reserva={reserva} deleteElement={handleDeleteClick}/>
        })*/}  
        {filtre =="Cliente" && elementsD && elementsD.filter(element => element.reservante.toString().includes(value)).map((elementFiltrat, index )=> {
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


