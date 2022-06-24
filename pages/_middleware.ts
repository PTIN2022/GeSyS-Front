import { NextResponse } from "next/server";

      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!
      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!
      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!
      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!
      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!
      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!
      // ESTO NO ES SEGURO, ES SOLO PARA HACER PRUEBAS!!!

export default async function middleware(req: NextResponse, res: NextResponse, next: () => void) {

  const url = req.url;
  const cookies = req.cookies;

  if (url.includes("/admin")) {
    if (!cookies.token) {
      return NextResponse.redirect('http://localhost:3000/login');
    }
  }

  if (url.includes("/login")) {
    if (cookies.token) {
      return NextResponse.redirect('http://localhost:3000/admin');
    }
  }

  return NextResponse.next()

}