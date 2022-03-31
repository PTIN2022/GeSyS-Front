import { NextPage } from "next"
import { useRouter } from "next/router";
import AddIncidents from "../../../components/AddIncidents";

const Estacion: NextPage = () => {

  const { query } = useRouter();
  const { estacion } = query;

  return (
    <>
      <div>Estación {estacion}</div>
      <AddIncidents />
    </>
  )
}

export default Estacion;