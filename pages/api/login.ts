import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { PerfilData } from '../admin/perfil'

export const JWT_SECRET = 'CECRETO_SECRET'

interface PerfilDataPass extends PerfilData {
  passw: string;
}

export const usuariosTmp: PerfilDataPass[] = [
  {
    id: 1,
    username: 'admin_alf',
    passw: 'admin',
    pfp: 'https://lh3.googleusercontent.com/a-/AOh14GiTFP4e-OiBF49fsn13bU2bPCMdWjJOHWdipJK-=s83-c-mo',
    nombre: "Alfredo",
    apellido: "Manresa Martinez",
    telefono: "+34684789456",
    email: "alfredo.manresa@estudiantat.upc.edu",
    dni: "87958482S",
    cargo: 'Trabajador',
    question: 'Como?',
    estacion: 'VG1',
    estado: true,
  },
  {
    id: 2,
    username: 'admin_xavi',
    passw: 'admin',
    pfp: 'https://i.imgur.com/5roUQ5r.png',
    nombre: "Xavier",
    apellido: "Bermejo Sotillo",
    telefono: "+34624879543",
    email: "xavier.bermejo@estudiantat.upc.edu",
    dni: "64218796N",
    cargo: 'Responsable',
    question: 'Como?',
    estacion: 'VG2',
    estado: true,
  },
  {
    id: 3,
    username: 'admin_xinta',
    passw: 'admin',
    pfp: 'https://i.imgur.com/5roUQ5r.png',
    nombre: "Xavier",
    apellido: "Bermejo Sotillo",
    telefono: "+34624879543",
    email: "xinta@estudiantat.upc.edu",
    dni: "64218796N",
    cargo: 'Administrador',
    question: 'Como?',
    estacion: 'VG3',
    estado: true,
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse<{ message: string }> ) {
  
  if (req.method !== 'POST') {
    return res.status(405).end('Invalid method')
  }

  if (req.body.username === undefined || req.body.password === undefined) {
    return res.status(400).end('Bad request')
  }

  const { username, password } = req.body

  const usuario = usuariosTmp.find(u => u.username === username && u.passw === password)

  if (!usuario) {
    return res.status(401).end('Unauthorized')
  }

  const removePass = {...usuario, password: undefined}

  const token = jwt.sign(removePass, JWT_SECRET);

  const serialised = serialize("OursiteJWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialised);

  return res.status(200).json({ message: 'Success!' })
  
}
