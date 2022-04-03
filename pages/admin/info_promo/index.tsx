import { Textarea } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { Grid } from '@mantine/core';

import { Container } from '@mantine/core';


export default function info_promo(){
    return(
      <>
      <h1>Promocion</h1>
      <Container>
        <Grid gutter="xl">
          <Grid.Col span={5}>
            <TextInput value={"VG1"}
              placeholder="10%"
              label="Estación"
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
