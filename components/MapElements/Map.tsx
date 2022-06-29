import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import { IconAveria, IconDesactivado, IconFuncionando } from "./IconMarkerEstacion";
import { useContext, useEffect, useRef, useState } from "react";
import { LatLngExpression } from "leaflet";
import EstacionPopup from "./EstacionPopup";
import { useMap } from "react-leaflet";
import MapSearchBar, { MapSearchBarHandle } from "./MapSearchBar";
import { AuthContext } from "../../contexts/AuthContext";
import { Group, Select } from "@mantine/core";
import { EstState } from '../../pages/admin/estaciones';

export type StationStatus = "Active" | "Deactivated" | "Damaged";

export interface EstacionesSelectData {
  label: string;
  value: string;
  ubicacion: LatLngExpression,
}

export interface MarkerEstacionProps {
  capacidad: number;
  id_estacion: number;
  posicion: LatLngExpression;
  nombre_est: string;
  ocupation_actual: number;
  potencia_contratada: number;
  potencia_usada: number;
  estado: string;
}

const accessToken = 'pk.eyJ1IjoieHBhdGF0YTY5IiwiYSI6ImNsMTZ4b2RxcDB5aG0za2thcjIwendlMXEifQ.vlI6K1U3_DOGuSaa8X7R3g';

const GetIconFromStationStatus = (status: string) => {
  switch (status) {
    case "Activa":
      return IconFuncionando;
    case "Inactiva":
      return IconDesactivado;
    case "Dañada":
      return IconAveria;
    default:
      return IconAveria;
  }
}

const Map = () => {

  const { requestAuthenticated } = useContext(AuthContext)
    
  const [estations, setEstations] = useState<MarkerEstacionProps[]>([]);

  const [center, setCenter] = useState<LatLngExpression>([41.220285, 1.730198]);

  const [selectEstaciones, setSelectEstaciones] = useState<EstacionesSelectData[]>([])

  useEffect(() => {
    const fetchDatos = async () => {
      const response = await requestAuthenticated('https://craaxkvm.epsevg.upc.es:23600/api/estaciones')
      const datos = await response.json()
      const redone = datos.map((element: any) => {
        return {
          ...element,
          posicion: [element.latitud, element.longitud]
        }
      })
      setEstations(redone)
    }

    fetchDatos()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    const selectDatos = estations.map((element: MarkerEstacionProps) => {
      return {
        label: element.nombre_est,
        value: element.nombre_est,
        ubicacion: element.posicion
      }
    }) as EstacionesSelectData[]

    setSelectEstaciones(selectDatos)

  }, [estations])

  const childRef = useRef<MapSearchBarHandle>(null)

  const handleOnChangeSelect = (event: string | null) => {

    let i = 0
    while (i < selectEstaciones.length && selectEstaciones[i].label != event){
      i += 1
    }

    childRef.current!.MapSetView(selectEstaciones[i].ubicacion)
  }

  const calculateHeightMap = () => {
    
  }

  return (
    <Group style={{ height: "65%", width: "100%", zIndex: 0 }}>
      
      <Select
        label="Estaciones"
        placeholder="Elige estación"
        searchable
        nothingFound="No options"
        data={selectEstaciones}
        onChange={(event) => handleOnChangeSelect(event)}
        style={{marginBottom: '1em'}}
      />

      <MapContainer
        center={center}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >

        <MapSearchBar ref={childRef} />

        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`} 
          />
        
        {estations && estations.map((estacion, index) => {
          return (
            <Marker
              key={index}
              position={estacion.posicion}
              icon={GetIconFromStationStatus(estacion.estado)} // ESTO TIENES QUE CAMBIARLO POR EL ESTADO DE LA ESTACION
              >
              <EstacionPopup estacion={estacion} />
            </Marker>
          )
        })}

      </MapContainer>
    </Group>
  );
};

export default Map;
