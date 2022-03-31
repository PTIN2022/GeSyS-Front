interface PowerDataProps {
  maxPower: number;
  powerBeingUsed: number;
}

interface StationDataProps {
  workingStations: number;
  damagedStations: number;
  deactivatedStations: number;
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
  Problema: char[5];
  Date: string; 
}