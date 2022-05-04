import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export const JWT_SECRET = 'CECRETO_SECRET'

export default function handler(req: NextApiRequest, res: NextApiResponse<any> ) {
  const { cookies } = req;

  const token = cookies.OursiteJWT;

  if (!token) {
    return res.json({ message: "Invalid token!" });
  }

  try {
    const user = jwt.decode(token);
    res.status(200).send(user);
  } catch (e) {
    return res.json({ message: "Invalid token!" });
  }
  
}
