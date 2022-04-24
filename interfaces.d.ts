import internal from "stream";
import { Url } from "url";

export interface PowerDataProps {
  maxPower: number;
  powerBeingUsed: number;
}

export interface StationDataProps {
  workingStations: number;
  damagedStations: number;
  deactivatedStations: number;
}
export interface PromoRowProps {
  Est: string;
  Descuento: string;
  Cupones: string; 
  Fecha_ini: date; 
  Fecha_fin: date;
  Estado: boolean; 
}
export interface PromoData {
  Estacion: string;
  Descuento: number;
  Cupones: number;
  Descripcion: string;
  fecha_inicio: Date | null;
  fecha_fin: Date | null;
} 

export interface EstacionRowProps {
  Est: string;
  Dir: string;
  Kwh: string; 
  Oc : string; 
  m2: number; 
  enc: string;
}
export interface SoporteRowProps {
  Name: string;
  Problema: string;
  Date: string; 
}
export interface AveriaRowProps {
  Est: string;
  Dir: string;
  Date: string; 
  State: string; 
  Desc: string; 
}
export interface TrabajadorRowProps {
  Name: string;
  Rol: string;
  Last_access: string; 
  Foto: url;
}

export interface NavbarItemProps {
  label: string;
  href: string;
}

export interface IncidenciaElement {
  planta: string;
  plaza: string;
  texto: string;
}

export interface PerfilData {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: string;
  cargo: string;
}

export interface ReservaRowProps{
  id : number; 
  reservante : string;
  matricula: string;
  estacion: string;
  nPlaza:number;
  date: date | null;
  duration: number;
  kwh: number;
  money: number;
}

type StationStatus = "Active" | "Deactivated" | "Damaged";

export interface MarkerEstacionProps {
  name: string;
  ubicacion: number[2],
  state: StationStatus
}