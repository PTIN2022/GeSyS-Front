import { NextPage } from "next"
import React, { useEffect, useState } from 'react';
import { Alert, Select } from '@mantine/core';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js"
import { Line } from 'react-chartjs-2';
import { AlertCircle } from "tabler-icons-react";
import { DateRangePicker } from '@mantine/dates';


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
            data: [45000, 45000, 45000, 45000, 45000, 40000, 40000, 40000, 45000, 45000, 40000, 40000]
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
            data: [45000, 45000, 45000, 45000, 45000, 40000, 40000, 40000, 45000, 45000, 40000, 40000]
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
            data: [45000, 45000, 47000, 45000, 45000, 40000, 40000, 40000, 45000, 45000, 40000, 6000]
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
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
      new Date(2022, 3, 1),
      new Date(2022, 3, 30),
    ]);

    const arrayEstaciones = estaciones.map((est: EstadisticaEstacion, index: number) => {
        return est.name
    })

    useEffect(() => {
        const total_estaciones = calcularTotalEstaciones(estaciones)
        setEstaciones(estaciones => [...estaciones, total_estaciones]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }, [estacionOpcion]) 

    useEffect(() => {
      setEstacionGrafica(estations_range()) 
    }, [fechasLimite])

    function isThereAWarning(est: EstadisticaEstacion) {
      const estationData = []
      for(let i = 0; i < est.datasets[0].data.length; i++) {
        if(est.datasets[0].data[i] >= est.datasets[1].data[i] * 0.9 || est.datasets[0].data[i] < est.datasets[1].data[i] * 0.5) {
          const estation = {
            month: est.labels[i],
            data: (est.datasets[0].data[i]/est.datasets[1].data[i] * 100).toFixed(2)
          }
          estationData.push(estation)
        }
      }
      if(estationData.length == 1) {
        setWarning("El mes " + estationData[0].month + " se ha consumido el " + estationData[0].data + "% de la potencia contratada. Quizás seria bueno adaptar la potencia contratada.")
      }
      else if(estationData.length > 1) {
        
        let months = "" + estationData[0].month, datas = "" + estationData[0].data + "%"
        for(let i = 1; i < estationData.length; i++) {
          if(estationData.length - 1 == i) {
            months += " y "
            datas += " y "
          }
          else {
            months += ", "
            datas += ", "
          }
          months += estationData[i].month
          datas += estationData[i].data + "%"
        }
        setWarning("Los meses de " + months + " se han consumido el " + datas + " de las potencias contratadas respectivamente. Quizás seria bueno adaptar la potencia contratada.")
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

    function estations_range() {

      let date1 = fechasLimite[0]?.toLocaleDateString()
      let date2 = fechasLimite[1]?.toLocaleDateString()
      
      console.log("aqui ", date1)
      console.log(date2)
      //let est = all_estations.find(estation => estation.name === estacionOption.name)
      
      let copy = false, finish = false;
      const label = []
      const data0 = [], data1 = []   
      let i = 0;
      while(!finish && i < estacionOpcion.labels.length) {
        if(estacionOpcion.labels[i] === date1) copy = true;
        if(copy) {
          label.push(estacionOpcion.labels[i]);
          data0.push(estacionOpcion.datasets[0].data[i]);
          data1.push(estacionOpcion.datasets[1].data[i]);
        }
        if(estacionOpcion.labels[i] === date2) finish = true;
        i++;
      }

      let dataset0: EstadisticaDataset = {
        label: estacionOpcion.datasets[0].label,
        fill: estacionOpcion.datasets[0].fill,
        backgroundColor: estacionOpcion.datasets[0].backgroundColor,
        borderColor: estacionOpcion.datasets[0].borderColor,
        data: data0
      }  

      let dataset1: EstadisticaDataset = {
        label: estacionOpcion.datasets[1].label,
        fill: estacionOpcion.datasets[1].fill,
        backgroundColor: estacionOpcion.datasets[1].backgroundColor,
        borderColor: estacionOpcion.datasets[1].borderColor,
        data: data0
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