import { Grid, Group, Space, Text } from "@mantine/core";
import { NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState} from "react";
import AddIncidents from "../../../components/AddIncidents";
import PlazaInfo from "../../../components/PlazaInfo";


export interface PlazaData {
  id_cargador: string;
  estado: string;
}
const Estacion: NextPage = () => {

  const { query } = useRouter();
  const { estacion } = query;

  const [plazas, setplazas] = useState<PlazaData[]>();
  const [potencia_now, setPotencia_now] = useState("");
  const [potencia_max, setPotencia_max] = useState("");
  const [ocupacion, setOcupacion] = useState("");

  useEffect(() => {
    const fetchEstacion = async () => {
      if (estacion == undefined) return
      const result = await fetch(`http://craaxkvm.epsevg.upc.es:23601/api/estaciones/${estacion}`);
      const data = await result.json();
      setPotencia_now(data.potencia_usada);
      setPotencia_max(data.potencia_contratada);
      setOcupacion(data.ocupation_actual);
      const pla = []
      console.log(data.Cargadores)
      for(let i=0; i<data.Cargadores.length; i++) {
        let pla_aux:PlazaData = {
          id_cargador: data.Cargadores[i].posicion,
          estado: data.Cargadores[i].estado,
        }
        pla.push(pla_aux)
        console.log(pla_aux.id_cargador, pla_aux.estado);
      }
      setplazas(pla);
    }
    fetchEstacion();
  }, [estacion])

  return (
    <>
      <Head>
        <title>Gesys - Estación: {estacion}</title>
      </Head>
      <Text align="left" size="xl">Estación {estacion}</Text>
      <Text align="left" size="sm">Kwh Contractat: {potencia_max}</Text>
      <Text align="left" size="sm">Kwh Actual: {potencia_now}</Text>
      <Text align="left" size="sm">Ocupació: {ocupacion}</Text>
      <Space w="xs"/>
      <Group position="center">
        <Grid gutter={"xs"}>
          {plazas && plazas.map((element, index) => {
            return <PlazaInfo key={index} {...element}/>
          })}
        </Grid>
      </Group>
    </>
  )
}

export default Estacion;