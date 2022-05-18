import { Button, Modal, Select, Textarea } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { Grid } from '@mantine/core';
import 'dayjs/locale/es'
import { Container } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Calendar } from 'tabler-icons-react';


export interface PromoData {
  id_promo: string;
  descuento: number;
  id_estacion: number;
  fecha_inicio: Date | null;
  fecha_fin: Date | null;
  estado: boolean;
  descripcion: string;
  cupones_max: number;
}

export interface SelectLabelValue {
  value: string;
  label: string;
}

const AddPromocion = () => {

    const [opened, setOpened] = useState(false);
    const [promo, setPromo] = useState<PromoData>({
      id_promo: '',
      id_estacion: 0,
      descuento: 0,
      fecha_inicio: null,
      fecha_fin: null,
      estado: false,
      descripcion: '',
      cupones_max: 0
    });

    const [estacionSelec, setEstacionSelec] = useState<string>('');
    const [estaciones, setEstaciones] = useState<SelectLabelValue[]>([]);

    useEffect(() => {
      const fetchDatos = () => {
        fetch('http://craaxkvm.epsevg.upc.es:23601/api/estaciones')
          .then(res => res.json())
          .then(data => {
            const est = []
            for(let i=0; i<data.length; i++) {
              const tmp: SelectLabelValue = {
                value: data[i].id_estacion,
                label: data[i].nombre_est
              }
              est.push(tmp)
            }
            setEstaciones(est);
          });
      }
      fetchDatos();
    }, [])

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

      const data: PromoData = {
        id_promo: promo.id_promo,
        descuento: promo.descuento,
        id_estacion: parseInt(estacionSelec),
        fecha_inicio: promo.fecha_inicio,
        fecha_fin: promo.fecha_fin,
        estado: promo.estado,
        descripcion: promo.descripcion,
        cupones_max: promo.cupones_max
      }

      // ESTA MIERDA NO VA PORQUE NO TIENEN LA API TODAVIA :/
      try {
        const response = await fetch('http://craaxkvm.epsevg.upc.es:23601/api/promociones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        const datos = await response.json();

        if (response.status !== 200) {
          alert(datos.toString());
          return;
        }
  
        setOpened(false)
      }
      catch (error) {
        console.error(error);
      }

    }

    const handleChangeLimiteCupones = (event: React.ChangeEvent<HTMLInputElement>) => {
      const re = /^[0-9\b]+$/;
      if (event.target.value == '') {
        setPromo({...promo, cupones_max: 0})
      }
      else if (re.test(event.target.value)) {
        setPromo({...promo, cupones_max: parseInt(event.target.value)})
      }
    }

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
                data={estaciones}
                onChange={(e) => {
                  setEstacionSelec(e!)
                }}
              />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                    placeholder="10%"
                    label="Descuento [%]"
                    value={promo.descuento}
                    onChange={handleChangeLimiteDescuento}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                    placeholder="10%" 
                    label="Limite Cupones"
                    value={promo.cupones_max}
                    onChange={handleChangeLimiteCupones}
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