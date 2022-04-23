import { Autocomplete, MultiSelect, Textarea } from '@mantine/core';
import React, { useState } from 'react';
import { TextInput } from '@mantine/core';
import { Grid } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';

import { Container } from '@mantine/core';
const data = [
  {value: 'VG1', label:'VG1'},
  {value: 'VG2', label:'VG2'},
  {value: 'VG3', label:'VG3'},
  {value: 'VG4', label:'VG4'}
];

const Promocion = () => {
  const [data_ini,setData_ini] = useState<Date>(new Date());
  const [hora_ini,setHora_ini] = useState<Date>(new Date());

  const [data_fi,setData_fi] = useState<Date>(new Date());
  const [hora_fi,setHora_fi] = useState<Date>(new Date());
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
            <TextInput 
              value={"15%"}
              placeholder="10%"
              label="Descuento [%]"
              readOnly
              disabled
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput 
              value={"100"}
              placeholder="10%"
              label="Limite Cupones"
              readOnly
              disabled
            />
          </Grid.Col>

          <Grid.Col span={5}>
            <DatePicker
              disabled 
              value={data_ini}
              label="Fecha Inicio:"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TimeInput 
              value={hora_ini}
              label="Hora Inicio:"
              disabled
            />
          </Grid.Col>

          <br></br>

          <Grid.Col span={5}>
            <DatePicker
              disabled 
              value={data_fi}
              readOnly
              label="Fecha Fin:"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TimeInput
              value={hora_fi}
              label="Hora Fin:"
              disabled
            />
          </Grid.Col>
        </Grid>

        <br></br>

        <Textarea 
          readOnly={true} 
          value={"Bueno Bonito Barato"}
          placeholder="Promoción para incentivar el uso de la estación
          en esta hora de poco uso"
          label="Descripción"      
          minRows={4}
          maxRows={6}
          disabled
        /> 
      </Container>
      </>
    )
}

export default Promocion;