import { Button } from "@mantine/core"
import Link from "next/link"
import { SoporteRowProps } from "../pages/admin/soporte_tecnico"

const FilaSoporte = ({ 	mensaje, estado, fecha, id_ticket  } : SoporteRowProps) => {
  return (
    <tr>
      <td>{id_ticket}</td>
      <td>{mensaje}</td>
      <td>{estado ? 'true _' : 'false _'}</td>
      <td>{fecha}</td>
      <td>
        <Link href={`http://localhost:3000/admin/ticket/${id_ticket}`} passHref={true} >
          <Button>
            Ver mas
          </Button>
        </Link>
      </td>
    </tr>
  )
} 
export default FilaSoporte