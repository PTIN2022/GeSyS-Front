import type { NextApiRequest, NextApiResponse } from 'next'
import { PerfilData } from '../../interfaces'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PerfilData>
) {
  res.status(200).json({ 
    nombre: "Alfredo",
    apellido: "Manresa Martinez",
    telefono: "+34 666 777 888",
    email: "alfredo.manresa@estudiantat.upc.edu",
    dni: "59603402S",
    cargo: "Administrador"
   })
}
