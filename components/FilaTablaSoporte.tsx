import { SoporteRowProps } from "../pages/admin/soporte_tecnico"

const FilaSoporte = ({ Name, Problema, Date } : SoporteRowProps) => {
  return (        
    <tr>
      <td>{Name}</td>
      <td>{Problema}</td>
      <td>{Date}</td>
    </tr>
  )
} 
export default FilaSoporte