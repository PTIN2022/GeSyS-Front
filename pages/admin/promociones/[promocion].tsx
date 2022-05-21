import { Autocomplete, Button, MultiSelect, Textarea } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { Grid } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';

import { Container } from '@mantine/core';
import { useRouter } from 'next/router';
import { PromoData } from '.';

const data = [
  {value: 'VG1', label:'VG1'},
  {value: 'VG2', label:'VG2'},
  {value: 'VG3', label:'VG3'},
  {value: 'VG4', label:'VG4'}
];

const Promocion = () => {

  const router = useRouter();

  const [data_ini,setData_ini] = useState<Date | null>(null);
  const [hora_ini,setHora_ini] = useState<Date | null>(null);

  const [data_fi,setData_fi] = useState<Date | null>(null);
  const [hora_fi,setHora_fi] = useState<Date | null>(null);

  const [promocion, setPromocion] = useState<PromoData | null>(null)
  const [estadoPagina, setEstadoPagina] = useState<string>('Cargando...');

  useEffect(() => {
    const fetchDatos = async (promocion: string) => {
      const res = await fetch(`http://craaxkvm.epsevg.upc.es:23601/api/promociones/${promocion}`);
      const data = await res.json();
      if (res.status === 200) {
        setPromocion(data);
      }
      else {
        setEstadoPagina("No existe una promocion con este id")
      }
    }
    const { promocion } = router.query;
    if (promocion != undefined) {
      fetchDatos(promocion as string);
    }
  }, [router])

  const handleBorrarPromocion = () => {

    const seguro = confirm('¿Estás seguro de que quieres borrar esta promoción?')

    if (!seguro) {
      return;
    }

    fetch(`http://craaxkvm.epsevg.upc.es:23601/api/promociones/${promocion!.id_promo}`, {
      "method": "DELETE",
      "headers": {
        "accept": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        router.push('/admin/promociones')
      }
    })
    .catch(err => {
      alert('Error al borrar la promoción')
    });

  }

    return(
      <>

      {promocion ? (
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

        <br></br>

        <Button style={{backgroundColor: 'red'}} onClick={handleBorrarPromocion}>
          Eliminar Promoción
        </Button>

      </Container>
      </>
      ) : (
        <h1>{estadoPagina}</h1>
      )}
      </>
    )
}

export default Promocion;