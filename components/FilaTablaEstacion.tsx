import { Button } from "@mantine/core"
import Link from "next/link"
import { EstacionRowProps } from "../pages/admin/estaciones"


const FilaEstacion = ({ Dir, Est, Kwh, Oc, enc, m2 , id } : EstacionRowProps) => {
  return (        
    <tr>
      <td>{Est}</td>
      <td>{Dir}</td>
      <td>{Kwh}</td>
      <td>{Oc}</td>
      <td>{m2}</td>
      <td>{enc}</td>
      <Button>
        <Link href={`http://localhost:3000/admin/estaciones/${id}`}>
          <text>Ver Estacion</text>
        </Link>
      </Button>
    </tr>
  )
} 

export default FilaEstacion