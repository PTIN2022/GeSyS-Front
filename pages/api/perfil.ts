import type { NextApiRequest, NextApiResponse } from 'next'
import { ErrorAPI, PerfilData } from '../../interfaces'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PerfilData | ErrorAPI>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: "Solamente se aceptan GET"
    })
  }

  return res.status(200).json({ 
    nombre: "Alfredo",
    apellido: "Manresa Martinez",
    telefono: "+34 666 777 888",
    email: "alfredo.manresa@estudiantat.upc.edu",
    dni: "59603402S",
    cargo: "Administrador",
    foto: "https://lh3.googleusercontent.com/a-/AOh14GiTFP4e-OiBF49fsn13bU2bPCMdWjJOHWdipJK-=s83-c-mo"
   })
}
