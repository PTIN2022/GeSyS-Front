import { Autocomplete, MultiSelect, Textarea } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { Grid } from '@mantine/core';
import { DatePicker,TimeInput } from '@mantine/dates';

import { Container } from '@mantine/core';
const data = [
  {value: 'VG1', label:'VG1'},
  {value: 'VG2', label:'VG2'},
  {value: 'VG3', label:'VG3'},
  {value: 'VG4', label:'VG4'}
];

const Promocion = () => {
  const [data_ini,setData_ini] = useState<Date>(new Date());
  const [hora_ini,setHora_ini] = useState<Date>(new Date('0:0'));

  const [data_fi,setData_fi] = useState<Date>(new Date());
  const [hora_fi,setHora_fi] = useState<Date>(new Date('12pm'));
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

          <br></br>

          <Grid.Col span={5}>
            <DatePicker 
              value={data_ini}
              onChange={setData_ini}//sale en rojo pero despues va asi que paso de ello
              label="Fecha Inicio:"
              required
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TimeInput 
              value={hora_ini}
              onChange={setHora_ini}
              label="Hora Inicio:"
              
            />
          </Grid.Col>

          <br></br>

          <Grid.Col span={5}>
            <DatePicker 
              value={data_fi}
              onChange={setData_fi}//sale en rojo pero despues va asi que paso de ello
              label="Fecha Fin:"
              required
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TimeInput 
              value={hora_fi}
              onChange={setHora_fi}
              label="Hora Fin:"
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