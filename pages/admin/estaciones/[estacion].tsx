import { Grid, Group,Paper, ThemeIcon } from "@mantine/core";
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

  useEffect(() => {
    const fetchEstacion = async () => {
      if (estacion == undefined) return
      const result = await fetch(`http://craaxkvm.epsevg.upc.es:23601/api/estaciones/${estacion}`);
      const data = await result.json();
      setPotencia_now(data.kwh_now);
      setPotencia_max(data.kwh_max);
      const pla = []

      for(let i=0; i<data.length; i++) {
        let pla_aux:PlazaData = {
          id_cargador: data[i].Cargadores.id_cargador,
          estado: data[i].Cargadores.estado,
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
      <div>Estación {estacion}</div>
      <div>Kwh Max: {potencia_max}</div>
      <div>Kwh Actual: {potencia_now}</div>
      <Grid>
        {plazas && plazas.map((element, index) => {
              return <PlazaInfo key={index} {...element}/>
        })}
      </Grid>
      <AddIncidents />
    </>
  )
}

export default Estacion;