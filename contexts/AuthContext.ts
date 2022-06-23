import { createContext } from "react";
import { PerfilData } from "../pages/admin/perfil";

export interface IAuth {
  user: PerfilData;
  login: (username: string, password: string) => any,
  logout: () => void
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
    passw: "",
    question: 'Como?',
    estacion: 'VG1',
    estado: true,
  },
  login: (username: string, password: string) => {},
  logout: () => {},
});