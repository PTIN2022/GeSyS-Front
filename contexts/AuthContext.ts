import { createContext } from "react";
import { PerfilData } from "../pages/admin/perfil";

export interface IAuth {
  user: PerfilData;
  login: (username: string, password: string) => any,
  logout: () => void,
  requestAuthenticated: (url: string, contentType?:string,  options?: any) => any,
  requestAuthenticatedForm: (url: string,method: string, form:any) => any,
  fetchUserInfo: () => void
}

export const AuthContext = createContext<IAuth>({
  user: {
    apellido: "",
    cargo: "trabajador",
    dni: "",
    email: "",
    estado: "",
    foto: "",
    id_estacion: 0,
    id_trabajador: 0,
    id_usuari: 0,
    nombre: "",
    question: "",
    telefono: "",
    token: "",
    type: "",
    ultimo_acceso: new Date(),
    username: ""
  },
  login: (username: string, password: string) => {},
  logout: () => {},
  requestAuthenticated: (url: string, contentType?:string, options?: any) => {},
  requestAuthenticatedForm: (url: string,method: string, form:any)=>{},
  fetchUserInfo: () => {}
});