import { NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import AddIncidents from "../../../components/AddIncidents";

const Estacion: NextPage = () => {

  const { query } = useRouter();
  const { estacion } = query;

  return (
    <>
      <Head>
        <title>Gesys - Estación: {estacion}</title>
      </Head>
      <div>Estación {estacion}</div>
      <AddIncidents />
    </>
  )
}

export default Estacion;