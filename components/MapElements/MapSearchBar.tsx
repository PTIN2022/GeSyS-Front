import { Select } from '@mantine/core';

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

function MapSearchBar() {
  return (
    <Select
      label="Estaciones"
      placeholder="Elige estación"
      searchable
      nothingFound="No options"
      data={data}
    />
  );
}

export default MapSearchBar;