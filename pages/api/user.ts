import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './login';

export default function handler(req: NextApiRequest, res: NextApiResponse<any> ) {
  
  const { cookies } = req;
  const token = cookies.OursiteJWT;

  if (!token) {
    return res.status(401).json({ message: "Invalid token!" });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.status(200).send(user);
  } catch (e) {
    return res.status(401).json({ message: "Invalid token!" });
  }
  
}
