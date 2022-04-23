import { Button, Modal, Textarea } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { Grid } from '@mantine/core';
import 'dayjs/locale/es'
import { Container } from '@mantine/core';
import { PromoData } from '../interfaces';
import { DatePicker } from '@mantine/dates';
import { Calendar } from 'tabler-icons-react';


const AddPromocion = () => {
    const [opened, setOpened] = useState(false);
    const [promo, setPromo] = useState<PromoData>({
        Estacion: '',
        Descuento: 0,
        Cupones: 0,
        Descripcion: '',
        fecha_inicio: null,
        fecha_fin: null,
      });
    return(
      <>
        <Modal size="xl"
            opened={opened}
            onClose={() => setOpened(false)}
            title="Introduzca los datos de la nueva promoción"
        >
        {
            <Container>
            <Grid gutter="xl">
              <Grid.Col span={6}>
                <TextInput 
                    placeholder="VGA1"
                    label="Estación"
                    value={promo.Estacion}
                    onChange={(event) => setPromo({...promo, Estacion: event.target.value})}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                    placeholder="10%"
                    label="Descuento [%]"
                    value={promo.Descuento}
                    onChange={(event) => setPromo({...promo, Descuento: event.currentTarget.valueAsNumber})}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput value={"100"}
                  placeholder="10%"
                  label="Limite Cupones"
                />
              </Grid.Col>
            </Grid>
            <Grid gutter="xl">
                <Grid.Col span={6}>
                    <DatePicker
                        locale= 'es'
                        placeholder="Escoger Fecha"
                        label="Fecha Inicio"
                        icon={<Calendar size={16} />}
                        value={promo.fecha_inicio}
                        onChange={(event) => setPromo({...promo, fecha_inicio: event})}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <DatePicker
                        locale= 'es'
                        placeholder="Escoger Fecha"
                        label="Fecha Fin"
                        icon={<Calendar size={16} />}
                        value={promo.fecha_fin}
                        onChange={(event) => setPromo({...promo, fecha_fin: event})}
                    />
                </Grid.Col>                        
            </Grid>                      


            <br></br>
            <Textarea
                placeholder="Promoción para incentivar el uso de la estación
                en esta hora de poco uso"
                label="Descripción"      
                minRows={4}
                maxRows={6} 
                value={promo.Descripcion} 
                onChange={(event) => setPromo({...promo, Descripcion: event.currentTarget.value})}     
            /> 
          </Container>
        }
        </Modal>

        <Button onClick={() => setOpened(true)}>Añadir Trabajador</Button>       
      </>
    )
}

export default AddPromocion;