import { NextResponse } from "next/server";

      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!
      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!
      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!
      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!
      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!
      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!
      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!

export default async function middleware(req: NextResponse) {

  const url = new URL(req.url);
  const cookies = req.cookies;

  if (req.url.includes("/admin")) {
    if (!cookies.token) {
      return NextResponse.redirect(`${url.origin}/login`);
    }
  }

  if (req.url.includes("/login")) {
    if (cookies.token) {
      return NextResponse.redirect(`${url.origin}/admin`);
    }
  }

  return NextResponse.next()

}