import { NextPage } from "next"
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

import { Line } from 'react-chartjs-2';


const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Potencia total utilizada',
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 59, 60, 48, 61]
      },
      {
          label: `Potencia total contratada`,
          fill: false,
          backgroundColor: 'rgba(255,10,10,0.3)',
          borderColor: 'rgba(255,10,10,0.5)',
          data: [90, 90, 90, 90, 90, 80, 80, 80, 90, 90, 80, 80]
      }
    ]
};

const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}

const Estadisticas: NextPage = () => {
    return (
        <div>
            <h1>Estadísticas</h1>
            <Line
                data={data}
                width={100}
                height={40}
                options={options}
            />
        </div>

    )
}

export default Estadisticas