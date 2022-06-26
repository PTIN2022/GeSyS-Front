import { createContext } from "react";
import { PerfilData } from "../pages/admin/perfil";

export interface IAuth {
  user: PerfilData;
  login: (username: string, password: string) => any,
  logout: () => void,
  requestAuthenticated: (url: string, contentType?:string,  options?: any) => any,
  fetchUserInfo: () => void
}

export const AuthContext = createContext<IAuth>({
  user: {
    token: "",
    username: "",
    pfp: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    dni: "",
    cargo: "Trabajador",
    question: 'Como?',
    estacion: 'VG1',
    estado: true,
  },
  login: (username: string, password: string) => {},
  logout: () => {},
  requestAuthenticated: (url: string, contentType?:string, options?: any) => {},
  fetchUserInfo: () => {}
});