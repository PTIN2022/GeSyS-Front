import { Grid } from "@mantine/core";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from '../contexts/AuthContext';

export interface InfoData {
  pot_max: number;
  pot_util: number;
  est_fun: number;
  est_av: number;
  est_des: number;
  clients: number;
}

const GeneralInfo = () => {

  const { requestAuthenticated } = useContext(AuthContext)
  const [infoData, setInfoData] = useState<InfoData>();

  useEffect(() => {
    const fetchData = async () => {
      const result= await requestAuthenticated("https://craaxkvm.epsevg.upc.es:23600/api/estaciones")
      const data = await result.json();

      const resultClients= await requestAuthenticated("https://craaxkvm.epsevg.upc.es:23600/api/clientes")
      const dataClients = await resultClients.json();

      console.log(dataClients)  
      let max = 0, util = 0, fun = 0, av = 0, des = 0;
      for(let i=0; i<data.length; i++) {
        max += data[i].potencia_contratada
        util += data[i].potencia_usada
        if(data[i].estado == "Dañada")
          av++
        else if(data[i].estado == "Activa")
          fun++
        else if(data[i].estado == "Inactiva")
          des++
      }
      let info:InfoData = {
        pot_max: max,
        pot_util: util,
        est_fun: fun,
        est_av: av,
        est_des: des,
        clients: dataClients.length
      }
      setInfoData(info)
    }
    fetchData();
  }, [])
    

  return (
    <Grid grow gutter={"xs"}>
      <Grid.Col span={1}>
        <Grid.Col span={1}>
          Potencia máxima de la red: {infoData?.pot_max}
        </Grid.Col>
        <Grid.Col span={1}>
          Potencia siendo utilizada: {infoData?.pot_util}
        </Grid.Col>
        <Grid.Col span={1}>
          Estaciones funcionando: {infoData?.est_fun}
        </Grid.Col>
        <Grid.Col span={1}>
          Estaciones averiadas: {infoData?.est_av}
        </Grid.Col>
        <Grid.Col span={1}>
          Estaciones inactivas: {infoData?.est_des}
        </Grid.Col>
      </Grid.Col>
      <Grid.Col span={1}>
        <Grid.Col span={1}>
          Clientes registrados: {infoData?.clients}
        </Grid.Col>
      </Grid.Col>
    </Grid>
  )
}

export default GeneralInfo;
