import { NextPage } from "next"
import React, { useEffect, useState, useContext } from 'react';
import { ActionIcon, Alert, Select } from '@mantine/core';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js"
import { Line } from 'react-chartjs-2';
import { AlertCircle } from "tabler-icons-react";
import { DateRangePicker, getMonthDays } from '@mantine/dates';
import { AuthContext } from '../../../contexts/AuthContext';


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


const all_estations: EstadisticaEstacion[] = [
    {
        name: "Loading...",
        labels: ['0'],
        datasets: [
          {
            label: 'Potencia total consumida(KW)',
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: [0]
          },
          {
            label: `Potencia ideal consumida`,
            fill: false,
            backgroundColor: 'rgba(255,10,10,0.3)',
            borderColor: 'rgba(255,10,10,0.5)',
            data: [0]
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



const Estadisticas: NextPage = () => {

  const { requestAuthenticated } = useContext(AuthContext)

    const [estacionActiva, setEstacionActiva] = useState('VG1');
    const [estaciones, setEstaciones] = useState<EstadisticaEstacion[]>(all_estations);
    const [estacionOpcion, setEstacionOpcion] = useState<EstadisticaEstacion>(estaciones[0]);
    const [estacionGrafica, setEstacionGrafica] = useState(estacionOpcion);
    const [warning, setWarning] = useState("");
    const [fechasLimite, setFechasLimite] = useState<[Date | null, Date | null]>([
      new Date(new Date(2022, 5, 10)),
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
      const fetchEstadisticas = async () => {
        const result = await requestAuthenticated("https://craaxkvm.epsevg.upc.es:23600/api/estadisticas")
        const data = await result.json();  
        console.log(data)
        const estadisticas = []
        for(let i=0; i<data.length; i++) {

          let dias = data[i].dias
          let lab = [], consumo = [], consumo_ideal = []
          for(let j=0; j<dias.length; j++) {
            lab.push(dias[j].dia)
            consumo.push(data[i].kwh_now)
            consumo_ideal.push(data[i].kwh_max)
          }
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
        setEstaciones(estadisticas);
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
      
      // Conversión de fecha a formato YYYY-MM-DD
      let date1 = fechasLimite[0]?.toLocaleDateString('en-CA').split('T')[0]
      let date2 = fechasLimite[1]?.toLocaleDateString('en-CA').split('T')[0]

      let copy = false, finish = false;
      const label = []
      const data0 = [], data1 = []  

      // Copia los datos de estacionOpcion que hay entre date1 y date2
      for(let i = 0; !finish && i < estacionOpcion.labels.length; i++) {
        if(estacionOpcion.labels[i] === date1) copy = true;
        if(copy) {
          label.push(estacionOpcion.labels[i]);
          data0.push(estacionOpcion.datasets[0].data[i]);
          data1.push(estacionOpcion.datasets[1].data[i]);
        }
        if(estacionOpcion.labels[i] === date2) finish = true;
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
              minDate={new Date(2022, 5, 10)}
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