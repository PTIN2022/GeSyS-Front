import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import { IconAveria, IconDesactivado, IconFuncionando } from "./IconMarkerEstacion";
import { useContext, useEffect, useRef, useState } from "react";
import { LatLngExpression } from "leaflet";
import EstacionPopup from "./EstacionPopup";
import { useMap } from "react-leaflet";
import MapSearchBar from "./MapSearchBar";
import { AuthContext } from "../../contexts/AuthContext";

export type StationStatus = "Active" | "Deactivated" | "Damaged";

export interface MarkerEstacionProps {
  capacidad: number;
  id_estacion: number;
  posicion: LatLngExpression;
  nombre_est: string;
  ocupation_actual: number;
  potencia_contratada: number;
  potencia_usada: number;
  state: StationStatus
}

const accessToken = 'pk.eyJ1IjoieHBhdGF0YTY5IiwiYSI6ImNsMTZ4b2RxcDB5aG0za2thcjIwendlMXEifQ.vlI6K1U3_DOGuSaa8X7R3g';

const GetIconFromStationStatus = (status: StationStatus) => {
  switch (status) {
    case "Active":
      return IconFuncionando;
    case "Deactivated":
      return IconDesactivado;
    case "Damaged":
      return IconAveria;
    default:
      return IconAveria;
  }
}

const Map = () => {

  const { requestAuthenticated } = useContext(AuthContext)
    
  const [mockEstations, setMockEstations] = useState<MarkerEstacionProps[]>([]);

  const [center, setCenter] = useState<LatLngExpression>([41.220285, 1.730198]);

  useEffect(() => {
    const fetchDatos = async () => {
      const response = await requestAuthenticated('https://craaxkvm.epsevg.upc.es:23601/api/estaciones')
      const datos = await response.json()
      const redone = datos.map((element: any) => {
        return {
          ...element,
          posicion: [element.latitud, element.longitud]
        }
      })
      setMockEstations(redone)
    }

    fetchDatos()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
    >
      <MapSearchBar/>

      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`} 
        />
      
      {mockEstations && mockEstations.map((estacion, index) => {
        return (
          <Marker
            key={index}
            position={estacion.posicion}
            icon={GetIconFromStationStatus('Active')} // ESTO TIENES QUE CAMBIARLO POR EL ESTADO DE LA ESTACION
            >
            <EstacionPopup estacion={estacion} />
          </Marker>
        )
      })}

    </MapContainer>
    </>
  );
};

export default Map;
