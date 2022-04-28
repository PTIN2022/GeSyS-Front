import { EstacionRowProps } from "../pages/admin/estaciones"

const FilaEstacion = ({ Dir, Est, Kwh, Oc, enc, m2 } : EstacionRowProps) => {
  return (        
    <tr>
      <td>{Est}</td>
      <td>{Dir}</td>
      <td>{Kwh}</td>
      <td>{Oc}</td>
      <td>{m2}</td>
      <td>{enc}</td>
    </tr>
  )
} 

export default FilaEstacion