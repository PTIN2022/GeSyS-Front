import { Button, Modal, Select, Textarea } from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { Grid } from '@mantine/core';
import 'dayjs/locale/es'
import { Container } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Calendar } from 'tabler-icons-react';
import { PromoData } from '../pages/admin/promociones';
import { AuthContext } from '../contexts/AuthContext';


export interface newpromo {
  id_estaciones: string,
  descripcion: string,
  descuento: number,
  fecha_inicio: Date | null,
  fecha_fin: Date | null,
}

const AddPromocion = (props: any) => {
  const { requestAuthenticated } = useContext(AuthContext)
    const [opened, setOpened] = useState(false);
    const [promo, setPromo] = useState<newpromo>({
      id_estaciones: '',
      descuento: 0,
      fecha_inicio: null,
      fecha_fin: null,
      descripcion: '',
      // cupones_max: 0
    });

    const [estacionSelec, setEstacionSelec] = useState<string>('');
 

    const handleChangeLimiteDescuento = (event: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '') {
          setPromo({...promo, descuento: 0})
        }
        else if (re.test(event.target.value)) {
          if (parseInt(event.target.value) >= 100) {
            setPromo({...promo, descuento: 100})
          }
          else {
            setPromo({...promo, descuento: parseInt(event.target.value)})
          }
        }
    }

    const handleSubmitNewPromo = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
       if (estacionSelec === '') {
         alert('Selecciona una estación');
         return;
       }
      if (promo.descuento === 0) {
        alert('Introduce un descuento');
        return;
      }
      if (promo.fecha_inicio === null) {
        alert('Introduce una fecha de inicio');
        return;
      }
      if (promo.fecha_fin === null) {
        alert('Introduce una fecha de fin');
        return;
      }
      if (promo.descripcion === '') {
        alert('Introduce una descripción');
        return;
      }

      const data: newpromo = {
        descuento: promo.descuento,
        id_estaciones: estacionSelec,
        fecha_inicio: promo.fecha_inicio,
        fecha_fin: promo.fecha_fin,
        descripcion: promo.descripcion,
        // cupones_max: promo.cupones_max
      }

      // ESTA MIERDA NO VA PORQUE NO TIENEN LA API TODAVIA :/
      try {

        // const form = new FormData();
        // form.append("descuento", data.descuento.toString());
        // form.append("fecha_inicio", data.fecha_inicio!.toISOString().slice(0, -5)); // Hack para que la mierda api funcione
        // form.append("fecha_fin", data.fecha_fin!.toISOString().slice(0, -5)); // Hack para que la mierda api funcione
        // form.append("descripcion", data.descripcion);
        // form.append("id_estaciones", data.id_estaciones.toString());
        const jeison = {
          id_estaciones: estacionSelec,
          descripcion: promo.descripcion,
          descuento: promo.descuento,
          fecha_inicio: promo.fecha_inicio.toISOString().slice(0, -5),
          fecha_fin: promo.fecha_fin.toISOString().slice(0, -5)
          // descuento: data.descuento,
          // id_estaciones: data.id_estaciones,
          // fecha_inicio: data.fecha_inicio,
          // fecha_fin: data.fecha_fin,
          // descripcion: data.descripcion,     
        }
        console.log(jeison)
        const res = await requestAuthenticated('https://craaxkvm.epsevg.upc.es:23600/api/promociones', "application/json",{
          "method": "POST",
          body: JSON.stringify(jeison),
        }) as Response;

        const json = await res.json();
        if (res.status === 200) {
          props.triggerReload();
          setPromo({
            //id_promo: 0,
            id_estaciones: '',
            descuento: 0,
            fecha_inicio: null,
            fecha_fin: null,
            //estado: true,
            descripcion: '',
            // cupones_max: 0
          })
          setOpened(false);
        }
        else {
          alert('Error al crear la promoción');
        }
  
      }
      catch (error) {
        console.error(error);
      }

    }

    // const handleChangeLimiteCupones = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const re = /^[0-9\b]+$/;
    //   if (event.target.value == '') {
    //     setPromo({...promo, cupones_max: 0})
    //   }
    //   else if (re.test(event.target.value)) {
    //     setPromo({...promo, cupones_max: parseInt(event.target.value)})
    //   }
    // }

    return(
      <>
        <Modal size="xl"
            opened={opened}
            onClose={() => setOpened(false)}
            title="Introduzca los datos de la nueva promoción">
            <Container>
            <Grid gutter="xl">
               <Grid.Col span={6}>
              <Select
                label="Estación"
                placeholder="Selecciona una estación"
                nothingFound="No hay estaciones que coincidan con la búsqueda"
                data={["1", "2", "3", "4", "5", "6", "7", "8"]}
                onChange={(e) => {
                  setEstacionSelec(e!)
                }}
              />
              </Grid.Col> 
              <Grid.Col span={6}>
                <TextInput
                    placeholder="10%"
                    label="Descuento [%]"
                    value={promo.descuento}
                    onChange={handleChangeLimiteDescuento}
                />
              </Grid.Col>
              {/* <Grid.Col span={3}>
                <TextInput
                    placeholder="10%" 
                    label="Limite Cupones"
                    value={promo.cupones_max}
                    onChange={handleChangeLimiteCupones}
                />
              </Grid.Col> */}
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
                value={promo.descripcion} 
                onChange={(event) => setPromo({...promo, descripcion: event.currentTarget.value})}     
            />
            <br></br>
                <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleSubmitNewPromo(event)}>
                    Guardar
                </Button>
          </Container>
        </Modal>

        <Button onClick={() => setOpened(true)}>Añadir Promocion</Button>       
      </>
    )
}

export default AddPromocion;