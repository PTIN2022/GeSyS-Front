import { ReservaRowProps } from '../interfaces'
import { Menu, Center, ActionIcon } from '@mantine/core';
import { Adjustments, InfoSquare,  DotsVertical, Search } from 'tabler-icons-react';
import Link from 'next/link';

const PromoRow = ({ reservante ,matricula, estacion,date,duration, kwh, money } : ReservaRowProps) => {
    return (        
        <tr>
            <td>{reservante}</td>
            <td>{matricula}</td>
            <td>{estacion}</td>
            <td>{date}</td>
            <td>{duration}</td>
            <td>{kwh}</td>
            <td>{money}</td>            
        </tr>
    )
} 
export default PromoRow