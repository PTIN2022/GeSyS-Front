import { createContext } from "react";
import { PerfilData } from "../pages/admin/perfil";

export interface IAuth {
  user: PerfilData | null,
  login: (username: string, password: string) => Promise<number>,
  logout: () => void
}

export const AuthContext = createContext<IAuth>({
  user: null,
  login: (username: string, password: string): any => {},
  logout: () => {},
});