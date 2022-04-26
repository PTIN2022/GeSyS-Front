import { AveriaRowProps } from "../pages/admin/averias"


const AveriaRow = ({ Est,Dir, Date,State,Desc } : AveriaRowProps) => {
    return (        
        <tr>
            <td>{Est}</td>
            <td>{Dir}</td>
            <td>{Date}</td>
            <td>{State}</td>
            <td>{Desc}</td>
        </tr>
    )
} 
export default AveriaRow