import { createContext } from "react";
import { PerfilData } from "../pages/admin/perfil";

export interface IAuth {
  login: (username: string, password: string) => any,
  logout: () => void
}

export const AuthContext = createContext<IAuth>({
  login: (username: string, password: string) => {},
  logout: () => {},
});