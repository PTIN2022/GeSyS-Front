import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import { Button } from "@mantine/core";
import { IconAveria, IconDesactivado, IconFuncionando } from "./IconMarkerEstacion";
import { useState } from "react";
import { MarkerEstacionProps } from "../../interfaces";
import { LatLngExpression, map } from "leaflet";

const accessToken = 'pk.eyJ1IjoieHBhdGF0YTY5IiwiYSI6ImNsMTZ4b2RxcDB5aG0za2thcjIwendlMXEifQ.vlI6K1U3_DOGuSaa8X7R3g';

const Map = () => {

  const [mockEstations, setMockEstations] = useState<MarkerEstacionProps[]>([
    {
      name: "Estacion 1",
      ubicacion: [41.220285, 1.730198],
      state: "available"
    },
    {
      name: "Estacion 2",
      ubicacion: [41.218126, 1.730589],
      state: "disabled"
    },
    {
      name: "Estacion 3",
      ubicacion: [41.218197, 1.734903],
      state: "broken"
    },
  ]);

  const [center, setCenter] = useState<LatLngExpression>([41.220285, 1.730198]);

  return (
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`} />
      
      {mockEstations && mockEstations.map((estacion, index) => {
        return (
          <Marker
            key={index}
            position={estacion.ubicacion}
            icon={estacion.state === "available" ? IconFuncionando : estacion.state === "disabled" ? IconDesactivado : IconAveria}
            >
            <Popup>
              <div>
                <h3>{estacion.name}</h3>
                <p>{estacion.state}</p>
                <Button>Disable</Button>
              </div>
            </Popup>
            </Marker>
        )
      })}
    </MapContainer>
  );
};

export default Map;
