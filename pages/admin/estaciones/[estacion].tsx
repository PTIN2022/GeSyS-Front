import { ActionIcon, Autocomplete, Box, Button, Center, Grid, Group, Modal, Popover, Space, Text } from "@mantine/core";
import { NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState} from "react";
import { Circle } from "tabler-icons-react";
import { EstState } from ".";
import AddIncidents from "../../../components/AddIncidents";
import EditEstState from "../../../components/EditEstState";
import PlazaInfo from "../../../components/PlazaInfo";
import { AuthContext } from "../../../contexts/AuthContext";


export interface PlazaData {
  id_cargador: string;
  estado: string;
}
const Estacion: NextPage = () => {
  const { requestAuthenticated } = useContext(AuthContext)
  
  const [opened,setOpened] = useState(false)
  const [Mopened,setMOpened] = useState(false)

  const { query } = useRouter();
  const { estacion } = query;

  const [plazas, setplazas] = useState<PlazaData[]>();
  const [potencia_now, setPotencia_now] = useState("");
  const [potencia_max, setPotencia_max] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [state,setState] = useState("")


  const [estation,setStation] = useState(null)
  useEffect(() => {
    const fetchEstacion = async () => {
      if (estacion == undefined) return
      const result = await requestAuthenticated (`https://craaxkvm.epsevg.upc.es:23600/api/estaciones/${estacion}`);
      const data = await result.json();
      setPotencia_now(data.potencia_usada);
      setPotencia_max(data.potencia_contratada);
      setOcupacion(data.ocupation_actual);
      // const r=Math.floor(Math.random() * 3); // esto es provisional
      setState(data.estado);
      setStation(data)
      console.log("ESTACIO:", data)
      const pla = []
      // console.log(data.Cargadores)
      for(let i=0; i<data.Cargadores.length; i++) {
        let pla_aux:PlazaData = {
          id_cargador: data.Cargadores[i].posicion,
          estado: data.Cargadores[i].estado,
        }
        pla.push(pla_aux)
        // console.log(pla_aux.id_cargador, pla_aux.estado);
      }
      setplazas(pla);
    }
    fetchEstacion();
  }, [estacion])

  // function EditEstState() {
  //   // console.log("Im in")
  //   // setMOpened(true)
  //   // console.log(Mopened)
  //   // return(      
  //   //      <Modal size="xl"
  //   //         opened={Mopened}
  //   //         onClose={() => setMOpened(false)}
  //   //         title="Introduzca los datos del nuevo clientes"
  //   //     >          
  //   //       <Box>
  //   //         <Autocomplete label="Elije El nuevo estado"
  //   //           placeholder="Estado"
  //   //           data={EstState}
  //   //           />
  //   //       </Box>          
  //   //     </Modal>
  //   // )

  // }


  return (
    <>
      <Head>
        <title>Gesys - Estación: {estacion}</title>
      </Head>
      <Text align="left" size="xl">Estación {estacion}</Text>
      { estation != null && <EditEstState estacion={estation}/>}
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