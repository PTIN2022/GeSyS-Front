import { Button } from "@mantine/core"
import Link from "next/link"
import { SoporteRowProps } from "../pages/admin/soporte_tecnico"

const FilaSoporte = ({ 	descripcion, estado, fecha, ticket_id  } : SoporteRowProps) => {
  return (
    
      <tr>
        <td>{ticket_id}</td>
        <td>{descripcion}</td>
        <td>{estado ? 'true _' : 'false _'}</td>
        <td>{fecha}</td>
        <td>
          <Link href={`http://localhost:3000/admin/ticket/${ticket_id}`} passHref={true} >
            <Button>
              Ver mas
            </Button>
          </Link>
        </td>
      </tr>
  )
} 
export default FilaSoporte