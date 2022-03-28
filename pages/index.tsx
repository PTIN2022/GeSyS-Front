import { Select } from '@mantine/core';
import type { NextPage } from 'next'
import { Button } from '@mantine/core';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
    
    <h1>
      Welcome to GeSyS
    </h1>

    <Select
      label="Selecciona estación"
      placeholder="Estación"
      data={[
        { value: 'vg1', label: 'Vilanova i la Geltrú 1' },
        { value: 'vg2', label: 'Vilanova i la Geltrú 2' },
        { value: 'sg1', label: 'Sitges 1' },
        { value: 'gf1', label: 'Garraf 1' },
      ]}
      onChange
      />
    </>
  )
}

export default Home
