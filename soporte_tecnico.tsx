import { NextPage } from 'next';
import { Table, Center } from '@mantine/core';
import SoporteRow from "../components/SoporteRow"
import * as React from 'react'
const elements = [
    { Name: "Cloe Bermudez", Problema:"Problema con aplicación mobil", Date: "11:35"},
    { Name: "Bernarda Estrella",
     Problema:"Creado esquema y mas texto para ver coomo queda, para vosotros aficion... siuu", 
     Date: "22-03-22"},
     { Name: "Cloe Bermudez", Problema:"Problema con aplicación mobil", Date: "11:35"},
     { Name: "Cloe Bermudez", Problema:"Problema con aplicación mobil", Date: "11:35"}

  ]; 
const  soporte_tecnico : NextPage =() => {
    return (
        <>
            <h1>Soporte Técnico</h1>
            <Table striped sx={(theme) => ({
                backgroundColor: theme.colors.blue[1],
                '&:srtiped': {
                    backgroundColor: theme.colors.blue[1],
                  },
            })}>
                <thead>
                    <tr> </tr>
                </thead>
                <tbody>                    
                    {elements && elements.map((element, index) => {
                        return <SoporteRow {...element}/>
                    })}
                </tbody>
            </Table>
            <style jsx>{`
                Table {
                background-color: pink;
                }
            `}</style>
        </>
        )   
    }
    export default soporte_tecnico