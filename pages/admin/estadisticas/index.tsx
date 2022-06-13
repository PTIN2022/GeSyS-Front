import { NextPage } from "next"
import React, { useEffect, useState } from 'react';
import { ActionIcon, Alert, Select } from '@mantine/core';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js"
import { Line } from 'react-chartjs-2';
import { AlertCircle, Disabled } from "tabler-icons-react";
import { DateRangePicker, getMonthDays } from '@mantine/dates';


export interface EstadisticaDataset {
  label: string;
  fill: boolean,
  backgroundColor: string,
  borderColor: string,
  data: number[]
}

export interface EstadisticaEstacion {
  name: string,
  labels: string[],
  datasets: EstadisticaDataset[]
}

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);


function getDatesInRange(startDate: Date, endDate: Date) {
  const date = new Date(startDate.getTime());
  
  const dates = [];

  while(date <= endDate) {
    dates.push(new Date(date).toLocaleDateString());
    date.setDate(date.getDate()+1);
  }
  return dates;
}

const d1 = new Date('2022-01-01');
const d2 = new Date(new Date().getTime() - 24*60*60*1000);

var dates = getDatesInRange(d1, d2);

function generateData(days: number, max: number, min: number) {
  const data = []
  for(let i = 0; i < days; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return data;
}

function sumaEstaciones(estaciones: EstadisticaEstacion[]) {
  const data = []
  let sum;
  for(let i = 0; i < dates.length ; i++) {
    sum = 0;
    for(let est = 0; est < estaciones.length; est++) {
      sum += estaciones[est].datasets[0].data[i]
    }
    data.push(sum);
  }
  return data;
}

const all_estations: EstadisticaEstacion[] = [
    {
        name: "VGA1",
        labels: dates,
        datasets: [
          {
            label: 'Potencia total consumida(KW)',
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: generateData(dates.length, 1000, 4000)
          },
          {
            label: `Potencia ideal consumida`,
            fill: false,
            backgroundColor: 'rgba(255,10,10,0.3)',
            borderColor: 'rgba(255,10,10,0.5)',
            data: [120000, 120000, 120000, 120000, 120000, 120000, 120000, 120000, 120000, 120000, 120000, 120000]
          }
        ]
    },
    {
        name: 'VGA2',
        labels: dates,
        datasets: [
          {
            label: 'Potencia total utilizada(KW)',
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: generateData(dates.length, 1000, 4000)
          },
          {
            label: `Potencia total contratada`,
            fill: false,
            backgroundColor: 'rgba(255,10,10,0.3)',
            borderColor: 'rgba(255,10,10,0.5)',
            data: [115000, 115000, 115000, 115000, 115000, 115000, 115000, 115000, 115000, 115000, 115000, 115000]
          }
        ]
    },
    {
        name: 'VGA3',
        labels: dates,
        datasets: [
          {
            label: 'Potencia total utilizada(KW)',
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: generateData(dates.length, 1000, 4000)
          },
          {
            label: `Potencia total contratada`,
            fill: false,
            backgroundColor: 'rgba(255,10,10,0.3)',
            borderColor: 'rgba(255,10,10,0.5)',
            data: [125000, 125000, 125000, 125000, 125000, 125000, 125000, 125000, 125000, 125000, 125000, 125000]
          }
        ]
    }
]

const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}

function calcularTotalPotenciaContratada(estaciones: EstadisticaEstacion[]) {
  const data = []
  let sum;
  for(let i = 0; i < estaciones[0].datasets[1].data.length ; i++) {
    sum = 0;
    for(let est = 0; est < estaciones.length; est++) {
      sum += estaciones[est].datasets[1].data[i]
    }
    data.push(sum);
  }
  return data;
}

const calcularTotalEstaciones = (estaciones: EstadisticaEstacion[]) => {
    const estacionTotal = {
        name: "Todas las estaciones",
        labels: dates,
        datasets: [
          {
            label: 'Potencia total utilizada(KW)',
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: sumaEstaciones(estaciones)
          },
          {
            label: `Potencia total contratada`,
            fill: false,
            backgroundColor: 'rgba(255,10,10,0.3)',
            borderColor: 'rgba(255,10,10,0.5)',
            data: calcularTotalPotenciaContratada(estaciones)
          }
        ]
    }
    return estacionTotal
}



const Estadisticas: NextPage = () => {

    const [estacionActiva, setEstacionActiva] = useState('Todas las estaciones');
    const [estaciones, setEstaciones] = useState<EstadisticaEstacion[]>(all_estations);
    const [estacionOpcion, setEstacionOpcion] = useState<EstadisticaEstacion>(estaciones[0]);
    const [estacionGrafica, setEstacionGrafica] = useState(estacionOpcion);
    const [warning, setWarning] = useState("");
    const [fechasLimite, setFechasLimite] = useState<[Date | null, Date | null]>([
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
    ]);

    const arrayEstaciones = estaciones.map((est: EstadisticaEstacion, index: number) => {
      let lab
      if(showFlag(est))
        lab = "🚩 " + est.name
      else
        lab = est.name
      return { 
        label: lab,
        value: est.name
      }
    })

    useEffect(() => {
        const total_estaciones = calcularTotalEstaciones(estaciones)
        setEstaciones(estaciones => [...estaciones, total_estaciones]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      const fetchEstadisticas = async () => {
        const result = await fetch('https://craaxkvm.epsevg.upc.es:23600/api/estadisticas');
        const data = await result.json();  
    
        const estadisticas = []
        for(let i=0; i<data.length; i++) {

          let dias = data[i].dias
          let lab = [], consumo = [], consumo_ideal = [0,0,0,0,0,0,0,0,0,0,0,0]
          for(let j=0; j<dias.length; j++) {
            lab.push(dias[j].dia)
            consumo.push(dias[j].potencia_max_cons)
          }
          consumo_ideal.fill(data[i].kwh_now)

          let estacion:EstadisticaEstacion = {
            name: data[i].estacion,
            labels: lab,
            datasets: [
              {
                label: 'Potencia total consumida(KW)',
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                data: consumo
              },
              {
                label: `Potencia contratada`,
                fill: false,
                backgroundColor: 'rgba(255,10,10,0.3)',
                borderColor: 'rgba(255,10,10,0.5)',
                data: consumo_ideal
              }
            ]
          }
          estadisticas.push(estacion)
        }
        console.log("estadisticas ->")
        console.log(estadisticas)
        //setEstaciones(est);
      }
      fetchEstadisticas();
    }, [])

    useEffect(() => {
        const estacion = estaciones.find((est: EstadisticaEstacion) => est.name === estacionActiva)
        if (estacion) {
            setEstacionOpcion(estacion)
            isThereAWarning(estacion)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [estacionActiva])

    useEffect(() => { 
      setEstacionGrafica(estations_range()) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [estacionOpcion]) 

    useEffect(() => {
      setEstacionGrafica(estations_range()) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fechasLimite])

    function showFlag(est: EstadisticaEstacion) {
      let currentMonth = new Date().getMonth();
      let currentDay = new Date().getDate();
      let currentYear = new Date().getFullYear();
      let days = getDaysOfMonth(currentYear, currentMonth);
      let consumptionExpected = est.datasets[1].data[currentMonth]
      let count = 0
      let currentEstation = est

      let firstDay = 0, lastDay = 0;
      for(let i=0; i<=currentMonth; i++) {
        if(i != currentMonth) firstDay += getDaysOfMonth(currentYear, i+1)
        else lastDay = firstDay + currentDay - 1
      }

      for(let i=firstDay; i<lastDay; i++) {
        if(currentEstation && currentEstation?.datasets[0].data[i] < (consumptionExpected/days)*0.6)
          count++
      }
      if(count > currentDay/2) {
        return true; 
      }
      else {
        return false;
      }
    }
    
    function isThereAWarning(est: EstadisticaEstacion) {

      let currentMonth = new Date().getMonth();
      let currentDay = new Date().getDate();
      let currentYear = new Date().getFullYear();
      let days = getDaysOfMonth(currentYear, currentMonth);
      let consumptionExpected = est.datasets[1].data[currentMonth]
      let count = 0;
      let currentEstation = estaciones.find((est: EstadisticaEstacion) => est.name === estacionActiva)

      let firstDay = 0, lastDay = 0;
      for(let i=0; i<=currentMonth; i++) {
        if(i != currentMonth) firstDay += getDaysOfMonth(currentYear, i+1)
        else lastDay = firstDay + currentDay - 1
      }

      for(let i=firstDay; i<lastDay; i++) {
        if(currentEstation && currentEstation?.datasets[0].data[i] < (consumptionExpected/days)*0.6)
          count++
      }
      if(count > currentDay/2) {
        setWarning("Durante " + count + " días de este mes, has utilizado menos del 60% de la potencia contratada. Sería recomendable añadir promociones para incentivar el consumo.")
      }
      else {
        setWarning("")
      }
    }


    const handleChangeSelected = (est: string | null) => {
        if (!est) {
            return;
        }
        setEstacionActiva(est)
        
    }

    function get_month(str: string) {
      let monthFound:boolean = false, finish:boolean = false;
      let month:string = "";
      for(let i=0; i<str.length && !finish; i++) {
        if(!monthFound && str[i] == "/") monthFound = true;
        else if(monthFound && str[i] != "/") month += str[i];
        else if(monthFound) {
          finish = true;
        }
      }
      return parseInt(month);
    }

    function get_year(str: string) {
      let found = 0;
      let year:string = "";
      for(let i=0; i<str.length; i++) {
        if(str[i] == "/") found++;
        if(found == 2 && str[i] != "/") year += str[i];
      }
      return parseInt(year);
    }

    function getDaysOfMonth(year: number, month: number) {
      return new Date(year, month, 0).getDate();
    }

    function estations_range() {
      let date1 = fechasLimite[0]?.toLocaleDateString()
      let date2 = fechasLimite[1]?.toLocaleDateString()
      
      let copy = false, finish = false;
      const label = []
      const data0 = [], data1 = []  
      let i = 0;
      while(!finish && i < estacionOpcion.labels.length) {
        if(estacionOpcion.labels[i] === date1) copy = true;
        if(copy) {
          label.push(estacionOpcion.labels[i]);
          data0.push(estacionOpcion.datasets[0].data[i]);
          let month = get_month(estacionOpcion.labels[i]);
          let year = get_year(estacionOpcion.labels[i])
          data1.push((estacionOpcion.datasets[1].data[month-1]/getDaysOfMonth(year, month)));
        }
        if(estacionOpcion.labels[i] === date2) finish = true;
        i++;
      }

      let dataset0: EstadisticaDataset = {
        label: 'Potencia máxima consumida(KW)',
        fill: estacionOpcion.datasets[0].fill,
        backgroundColor: estacionOpcion.datasets[0].backgroundColor,
        borderColor: estacionOpcion.datasets[0].borderColor,
        data: data0
      }  

      let dataset1: EstadisticaDataset = {
        label: 'Potencia contratada(KW)',
        fill: estacionOpcion.datasets[1].fill,
        backgroundColor: estacionOpcion.datasets[1].backgroundColor,
        borderColor: estacionOpcion.datasets[1].borderColor,
        data: data1
      }  
     
      let data: EstadisticaEstacion = {
        name: estacionOpcion.name,
        labels: label,
        datasets: [dataset0, dataset1]
      }
      
      return data;
    }

    return (
        <div>
            <h1>Estadísticas</h1>
            <Select
                label="Consumo de estaciones"
                placeholder="Escoge una estación para ver su consumo"
                searchable
                nothingFound="No options"
                data={arrayEstaciones}
                onChange={handleChangeSelected} />
            
            <DateRangePicker
              label="Fechas a visualizar"
              placeholder="Selecciona rango de fechas"
              minDate={new Date(2022, 0, 1)}
              maxDate={new Date(new Date().getTime() - 24*60*60*1000)}
              value={fechasLimite}
              onChange={setFechasLimite}
            />

            <Line
                data={estacionGrafica}
                width={100}
                height={40}
                options={options}
            />
            <br></br>            
            {warning && <Alert icon={<AlertCircle size={14} />} title="Warning!" color="red" radius="md" variant="outline">
                {warning}
              </Alert>}
        </div>
    )
}

export default Estadisticas