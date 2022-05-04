import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const usuariosTmp = [
  {
    username: 'admin_alf',
    password: 'admin',
    pfp: 'https://atenea.upc.edu/pluginfile.php/2833638/user/icon/campus/f1?rev=47202468',
    nombre: "Alfredo",
    apellido: "Manresa",
    telefono: "+34684789456",
    email: "alfredo.manresa@estudiantat.upc.edu",
    dni: "87958482S",
    cargo: 'Administrador',
  },
  {
    username: 'admin_xavi',
    password: 'admin',
    pfp: 'https://atenea.upc.edu/pluginfile.php/2818804/user/icon/campus/f1?rev=37349991',
    nombre: "Xavier",
    apellido: "Bermejo Sotillo",
    telefono: "+34624879543",
    email: "xavier.bermejo@estudiantat.upc.edu",
    dni: "64218796N",
    cargo: 'Responsable',
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse<{ token: string }> ) {
  
  if (req.method !== 'POST') {
    return res.status(405).end('Invalid method')
  }

  if (req.body.username === undefined || req.body.password === undefined) {
    return res.status(400).end('Bad request')
  }

  const { username, password } = req.body

  const usuario = usuariosTmp.find(u => u.username === username && u.password === password)

  if (!usuario) {
    return res.status(401).end('Unauthorized')
  }

  const removePass = {...usuario, password: undefined}

  return res.status(200).json({
    token: jwt.sign(removePass, 'CECRETO_SECRET')
  })
  
}
