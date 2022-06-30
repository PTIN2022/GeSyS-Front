import { AveriaRowProps } from '../pages/admin/averias';
import React, { useEffect, useState } from 'react';

const AveriaRow = (props: any) => {
    const averia: AveriaRowProps = props.averia;

    return (        
        <tr>
            <td>{averia.id_averia}</td>
            <td>{averia.Est}</td>
            <td>{averia.Date}</td>
            <td>{averia.State}</td>
            <td>{averia.Desc}</td>
            <td>{averia.id_trabajador}</td>

        </tr>
    );
}
export default AveriaRow
