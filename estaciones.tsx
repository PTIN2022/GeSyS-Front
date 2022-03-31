import { NextPage } from 'next';
import { Table, Center } from '@mantine/core';
import FilaEstacion from "../components/estacion_row"
import * as React from 'react'
const elements = [
    { Est: "VGA1", Dir: "Av. Victor Balaguer nº1",
     Kwh: '350/720', Oc : '50/100', m2:3000, enc:"Leandra de Borrell" },
    { Est: "VGA2", Dir: "Rambla Exposició nº1",
     Kwh: '200/504', Oc : '27/70', m2:1000, enc:"Noé Roig Balaguer" }
    
  ]; 
const  estaciones: NextPage =() => {
    return (
        <>
            <h1>Estaciones</h1>
            <Table striped highlightOnHover>
                <thead>
                    <tr>
                    <th>Estacion</th>
                    <th>Dirección</th>
                    <th>Kwh</th>
                    <th>Ocupación</th>
                    <th>Superficie 
                        <br></br> 
                        <Center  style={{ width: 75 }}>[m²]
                        </Center>
                    </th>
                    <th>Encargado</th>
                    </tr>
                </thead>
                <tbody>
                    {elements && elements.map((element, index) => {
                        return <FilaEstacion {...element}/>
                    })}
                </tbody>
            </Table>
        </>
        )   
    }
    export default estaciones