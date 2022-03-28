import { Coords, LatLngExpression } from "leaflet";

export interface PowerDataProps {
  maxPower: number;
  powerBeingUsed: number;
}

export interface StationDataProps {
  workingStations: number;
  damagedStations: number;
  deactivatedStations: number;
}

export type StationStatus = "Active" | "Deactivated" | "Damaged";

export interface MarkerEstacionProps {
  name: string;
  ubicacion: LatLngExpression;
  state: StationStatus;
}