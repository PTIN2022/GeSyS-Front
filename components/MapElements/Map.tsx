import { MapContainer, TileLayer, Marker, MapConsumerProps} from "react-leaflet";
import { IconAveria, IconDesactivado, IconFuncionando } from "./IconMarkerEstacion";
import { useState } from "react";
import { LatLngExpression, Map } from "leaflet";
import EstacionPopup from "./EstacionPopup";
import { Select } from "@mantine/core";

export type StationStatus = "Active" | "Deactivated" | "Damaged";

export interface MarkerEstacionProps {
  name: string;
  ubicacion: LatLngExpression,
  state: StationStatus
  kwh: number;
  nplazas: number; //nplazas total >> al final todas tienen el mismo num de plazas????
  nOcupadas: number;//nplazas ocupadas en el momento
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

const data = [
  {
    label: "Estacion 1",
    value: "Estacion 1",
    ubicacion: [41.217606, 1.727072],
  },
  {
    label: "Estacion 2",
    value: "Estacion 2",
    ubicacion: [41.221002, 1.730369],
  },
  {
    label: "Estacion 3",
    value: "Estacion 3",
    ubicacion: [41.225431, 1.737627],
  },
  {
    label: "Estacion 4",
    value: "Estacion 4",
    ubicacion: [41.227420, 1.728166],
  },
  {
    label: "Estacion 5",
    value: "Estacion 5",
    ubicacion: [41.229674, 1.721478],
  },
  {
    label: "Estacion 6",
    value: "Estacion 6",
    ubicacion: [41.222119, 1.718915],
  },
  {
    label: "Estacion 7",
    value: "Estacion 7",
    ubicacion: [41.223434, 1.710113],
  },
  {
    label: "Estacion 8",
    value: "Estacion 8",
    ubicacion: [41.217122, 1.709477],
  },
  ];


//const MapSetView(map: Map, event: string | null){
  function MapSetView(map: Map, event: string | null) {
  console.log(event)
  let i = 0
  while (i < data.length && data[i].label != event){
    i += 1
  }
  map.setView([data[i].ubicacion[0], data[i].ubicacion[1]])
}

function MapSearchBar( map: Map ) {
  return (
    <Select
      label="Estaciones"
      placeholder="Elige estación"
      searchable
      nothingFound="No options"
      data={data}
      onChange={(event) => MapSetView(map, event)}
    />
    )
  }


const Map = () => {
    
  const [mockEstations, setMockEstations] = useState<MarkerEstacionProps[]>([
    {
      name: "Estacion 1",
      ubicacion: [41.217606, 1.727072],
      state: "Active",
      kwh:300,
      nplazas:32,
      nOcupadas:12
    },
    {
      name: "Estacion 2",
      ubicacion: [41.221002, 1.730369],
      state: "Deactivated",
      kwh:0,
      nplazas:32,
      nOcupadas:10
    },
    {
      name: "Estacion 3",
      ubicacion: [41.225431, 1.737627],
      state: "Damaged",
      kwh:350,
      nplazas:32,
      nOcupadas:10
    },
    {
      name: "Estacion 4",
      ubicacion: [41.227420, 1.728166],
      state: "Active",
      kwh:300,
      nplazas:32,
      nOcupadas:27
    },
    {
      name: "Estacion 5",
      ubicacion: [41.229674, 1.721478],
      state: "Active",
      kwh:200,
      nplazas:32,
      nOcupadas:25
    },
    {
      name: "Estacion 6",
      ubicacion: [41.222119, 1.718915],
      state: "Deactivated",
      kwh:0,
      nplazas:32,
      nOcupadas:0
    },
    {
      name: "Estacion 7",
      ubicacion: [41.223434, 1.710113],
      state: "Damaged",
      kwh:150,
      nplazas:32,
      nOcupadas:5
    },
    {
      name: "Estacion 8",
      ubicacion: [41.217122, 1.709477],
      state: "Active",
      kwh:500,
      nplazas:32,
      nOcupadas:30
    }
  ]);

  const [center, setCenter] = useState<LatLngExpression>([41.220285, 1.730198]);
  const [map, setMap] = useState(null)

  return (
    <>
    {map ? <MapSearchBar map={map} /> : null}
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", zIndex: 0 }}
      ref={setMap}
    >

      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`} 
        />
      
      {mockEstations && mockEstations.map((estacion, index) => {
        return (
          <Marker
            key={index}
            position={estacion.ubicacion}
            icon={GetIconFromStationStatus(estacion.state)}
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
