import { Select } from '@mantine/core';
import { map, Map } from 'leaflet';
import { useMap } from 'react-leaflet';

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


function MapSetView(map: Map, event: string | null){
  console.log(event)
  let i = 0
  while (i < data.length && data[i].label != event){
    i += 1
  }
  map.setView([data[i].ubicacion[0], data[i].ubicacion[1]])
}

function MapSearchBar() {
  const map = useMap();
  return (
    <Select
      label="Estaciones"
      placeholder="Elige estación"
      searchable
      nothingFound="No options"
      data={data}
      onChange={(event) => MapSetView(map, event)}
    />
  );
}

export default MapSearchBar;