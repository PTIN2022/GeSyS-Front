import { Button } from "@mantine/core"
import Link from "next/link"
import { SoporteRowProps } from "../pages/admin/soporte_tecnico"

/*
  <th>Ticket ID</th>
  <th>Asunto</th>
  <th>Estado</th>
  <th>Fecha</th>
  <th>Client ID</th>
*/

const FilaSoporte = ({ 	id_ticket, asunto, estado, fecha, id_cliente } : SoporteRowProps) => {
  return (
    <tr>
      <td>{id_ticket}</td>
      <td>{asunto}</td>
      <td>{estado}</td>
      <td>{fecha.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" })}</td>
      <td>{id_cliente}</td>
      <td>
        <Link href={`/admin/ticket/${id_ticket}`} passHref={true} >
          <Button>
            Ver mas
          </Button>
        </Link>
      </td>
    </tr>
  )
} 
export default FilaSoporte