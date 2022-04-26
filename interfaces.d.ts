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
  Fecha_ini: string; 
  Fecha_fin: string; 
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

export type RolWorker = "Jefe" | "Administrador" | "Responsable" | "Trabajador";

export interface PerfilData {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: string;
  cargo: RolWorker;
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
  kwh: number;
  nplazas: number; //nplazas total >> al final todas tienen el mismo num de plazas????
  nOcupadas: number;//nplazas ocupadas en el momento

}

export interface ReservaData {
  hora: Data | null,
  plaza: string,
  idcliente: string,
  fecha: Data | null,
  duracion: Date | null,
}

export interface EstadisticaDataset {
  label: string;
  fill: boolean,
  backgroundColor: string,
  borderColor: string,
  data: number[]
}

export interface EstadisticaEstacion {
  name: string,
  labels: string[],
  datasets: EstadisticaDataset[]
}