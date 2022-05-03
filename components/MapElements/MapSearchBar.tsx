import { Select } from '@mantine/core';
import { Map } from 'leaflet';
import { useMap } from 'react-leaflet';


const data = [
    {
      label: 'VGA1',
      value: 'VGA1',
      location: [41.217606, 1.727072],
    },
  
    {
      label: 'VGA2',
      value: 'VGA2',
      location: [41.221002, 1.730369],
    },
  ];


function MapSetView(map: Map, event: string | null){
  console.log(event)
  let i = 0
  while (i < data.length && data[i].label != event){
    i += 1
  }
  map.setView([data[i].location[0], data[i].location[1]])
}

function MapSearchBar() {
  const map = useMap()
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