import { ActionIcon, Button } from "@mantine/core"
import Link from "next/link"
import { Circle } from "tabler-icons-react"
import { EstacionRowProps } from "../pages/admin/estaciones"


const FilaEstacion = ({ Dir, Est, Kwh, Oc, enc, m2 , id, state} : EstacionRowProps) => {
//const FilaEtacion = (props: any) => {
 // const est: EstacionRowProps = props.est;
  const dotColor=(state:string) =>{
    return
  }
  return (        
    <tr>
      <td>
        {state=='Activa' && <Circle fill={"#00b900"}/>}   
        {state=='Dañada' && <Circle fill={"#ffb044"} />}   
        {state=='Inactiva' && <Circle fill={"#bf2200"} />}
        </td>
      <td>{Est}</td>
      <td>{Dir}</td>
      <td>{Kwh}</td>
      <td>{Oc}</td>
      <td>{m2}</td>
      <td>{enc}</td>
      <td>
      <Link href={`http://localhost:3000/admin/estaciones/${id}`}>
        <Button>          
            Ver Estacion
        </Button>
        </Link>

      </td>
      
    </tr>
  )
} 

export default FilaEstacion