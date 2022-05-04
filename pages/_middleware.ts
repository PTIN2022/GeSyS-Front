import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./api/login";

export default function middleware(req: NextResponse, res: NextResponse, next: () => void) {

  const { cookies } = req;
  const jwt = cookies.OursiteJWT;
  const url = req.url;

  if (url.includes("/admin")) {
    if (jwt === undefined) {
      return NextResponse.redirect("http://localhost:3000/login");
    }

    try {
      verify(jwt, JWT_SECRET);
      return NextResponse.next()
    }
    catch (e) {
      return NextResponse.redirect("http://localhost:3000/login");
    }
  }

  return NextResponse.next();

}