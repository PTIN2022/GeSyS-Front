import { Grid } from "@mantine/core";
import { useState } from "react";

export interface PowerDataProps {
  maxPower: number;
  powerBeingUsed: number;
}

export interface StationDataProps {
  workingStations: number;
  damagedStations: number;
  deactivatedStations: number;
}

const GeneralInfo = () => {

  const mockDataPower: PowerDataProps = {
    maxPower: 58748,
    powerBeingUsed: 12587
  }

  const mockDataStation: StationDataProps = {
    workingStations: 0,
    damagedStations: 0,
    deactivatedStations: 0
  }

  const mockDataClients: number = 5436;

  const [powerData, setPowerData] = useState<PowerDataProps>(mockDataPower);
  const [stations, setStations] = useState<StationDataProps>(mockDataStation);
  const [clientsData, setSlientsData] = useState<number>(mockDataClients);

  return (
    <Grid grow gutter={"xs"}>
      <Grid.Col span={1}>
        <Grid.Col span={1}>
          Potencia maxima de la red: {powerData.maxPower}
        </Grid.Col>
        <Grid.Col span={1}>
          Potencia siendo utilizada: {powerData.powerBeingUsed} ({Math.trunc(powerData.powerBeingUsed/powerData.maxPower*100)}%)
        </Grid.Col>
        <Grid.Col span={1}>
          Estaciones funcionando: {stations.workingStations}
        </Grid.Col>
        <Grid.Col span={1}>
          Estaciones averiadas: {stations.damagedStations}
        </Grid.Col>
        <Grid.Col span={1}>
          Estaciones desactivadas: {stations.deactivatedStations}
        </Grid.Col>
      </Grid.Col>
      <Grid.Col span={1}>
        <Grid.Col span={1}>
          Clientes registrados: {clientsData}
        </Grid.Col>
      </Grid.Col>
    </Grid>
  )
}

export default GeneralInfo;
