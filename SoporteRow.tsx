import { SoporteRowProps } from '../interfaces'
const SoporteRow = ({ Name, Problema, Date } : SoporteRowProps) => {
    return (        
        <tr>
            <td>{Name}</td>
            <td>{Problema}</td>
            <td>{Date}</td>
        </tr>
    )
} 
export default SoporteRow