import { Autocomplete, MultiSelect, Textarea } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { Grid } from '@mantine/core';

import { Container } from '@mantine/core';
const data = [
  {value: 'VG1', label:'VG1'},
  {value: 'VG2', label:'VG2'},
  {value: 'VG3', label:'VG3'},
  {value: 'VG4', label:'VG4'}
];

const Promocion = () => {
    return(
      <>
      <h1>Promocion</h1>
      <Container>
        <Grid gutter="xl">
          <Grid.Col span={5}>
            <MultiSelect
              data={data}
              placeholder="Estacion"
              label="Estación/es" 
              searchable            
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput value={"15%"}
              placeholder="10%"
              label="Descuento [%]"
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput value={"100"}
              placeholder="10%"
              label="Limite Cupones"
            />
          </Grid.Col>
        </Grid>
        <br></br>
        <Textarea readOnly={true} value={"Bueno Bonito Barato"}
            placeholder="Promoción para incentivar el uso de la estación
            en esta hora de poco uso"
            label="Descripción"      
            minRows={4}
            maxRows={6}      
        /> 
      </Container>
      </>
    )
}

export default Promocion;