import { Autocomplete, Button, MultiSelect, Textarea } from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';
import { Grid } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';

import { Container } from '@mantine/core';
import { useRouter } from 'next/router';
import { PromoData } from '.';
import { AuthContext } from '../../../contexts/AuthContext';

// const data = [
//   {value: 'VG1', label:'VG1'},
//   {value: 'VG2', label:'VG2'},
//   {value: 'VG3', label:'VG3'},
//   {value: 'VG4', label:'VG4'}
// ];

const Promocion = () => {

  const router = useRouter();
  const { requestAuthenticated } = useContext(AuthContext)
  const [promocionObj, setPromocion] = useState<PromoData | null>(null)
  const [estadoPagina, setEstadoPagina] = useState<string>('Cargando...');

  const [editando, setEditando] = useState<boolean>(false);

  const [cambioDatos, setCambioDatos] = useState<boolean>(false);


  const handleEditar = () => {
    if (editando) {
      setEditando(false);
      if (cambioDatos) {
        setEstadoPagina('Guardando...');

        const fechaInicio = new Date(promocionObj!.fecha_inicio!);
        const fechaFin = new Date(promocionObj!.fecha_fin!);

        const form = new FormData();
        form.append("descuento", promocionObj!.descuento.toString());
        form.append("fecha_inicio", fechaInicio.toISOString().slice(0, -5));
        form.append("fecha_fin", fechaFin.toISOString().slice(0, -5));
        form.append("descripcion", promocionObj!.descripcion);
        // form.append("estado", promocionObj!.estado == true ? 'true' : 'false');

        // Print form data
        for (var pair of form.entries() as any) {
          console.log(pair[0]+ ', '+ pair[1]);
        }

        fetch(`https://craaxkvm.epsevg.upc.es:23600/api/promociones/${router.query.promocion}`, {
          "method": 'PUT',
          body: form,
          "headers": {
            "accept": "application/json"
          }
        }).then(res => {
          if (res.status === 200) {
            setEstadoPagina('Guardado');
            setTimeout(() => {
              setEstadoPagina('Cargando...');
            }, 2000);
          }
          setCambioDatos(false);
        })
      }
    } else {
      setEditando(true);
      setCambioDatos(false);
    }
  }

  useEffect(() => {
    const fetchDatos = async (promocionId: string) => {
      const res = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/promociones/${promocionId}`);
      const data = await res.json();
      if (res.status === 200) {
        console.log(data)
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const handleChangeLimiteDescuento = (event: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '') {
      setPromocion({...promocionObj, descuento: 0} as PromoData)
      setCambioDatos(true)
    }
    else if (re.test(event.target.value)) {
      if (parseInt(event.target.value) >= 100) {
        setPromocion({...promocionObj, descuento: 100} as PromoData)
        setCambioDatos(true)
      }
      else {
        setPromocion({...promocionObj, descuento: parseInt(event.target.value)} as PromoData)
        setCambioDatos(true)
      }
    }
}

  const handleBorrarPromocion = async () => {
    const seguro = confirm('¿Estás seguro de que quieres borrar esta promoción?')

    if (!seguro) {
      return;
    }

    const response = await requestAuthenticated (`https://craaxkvm.epsevg.upc.es:23600/api/promociones/${promocionObj!.id_promo}`,"", {
      "method": "DELETE",
    })
    if (response.status == 200) {
        router.push('/admin/promociones')
      }
      else {
        alert('Error al borrar promocion')
      }
  }

    return(
      <>
      { promocionObj != null ? (
        <>
        <h1>Promocion {router.query.promocion}</h1>
        <Container>
          <Button onClick={handleEditar}>
            {editando ? 'Guardar' : 'Editar'}
          </Button>
          <Grid gutter="xl">
            {/* <Grid.Col span={5}>
              <MultiSelect
                data={data}
                placeholder="Estacion"
                label="Estación/es" 
                searchable            
              />
            </Grid.Col> */}
            <Grid.Col span={12}>
              <TextInput 
                value={promocionObj.descuento}
                placeholder="10%"
                label="Descuento [%]"
                readOnly={!editando}
                disabled={!editando}
                onChange={handleChangeLimiteDescuento}
              />
            </Grid.Col>
            
            {/* <Grid.Col span={6}>
              <TextInput 
                value={"100"}
                placeholder="10%"
                label="Limite Cupones"
                readOnly={!editando}
                disabled={!editando}
                onChange={(event) => setPromocion({...promocionObj, descuento: event.target.value})}
                setCambioDatos(true)
              />
            </Grid.Col> */}

            <Grid.Col span={6}>
              <DatePicker 
                value={promocionObj.fecha_inicio}
                readOnly={!editando}
                disabled={!editando}
                onChange={(event) => {
                  setPromocion({...promocionObj, fecha_inicio: event})
                  setCambioDatos(true)
                }}
                label="Fecha Inicio:"
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <DatePicker 
                value={promocionObj.fecha_fin}
                readOnly={!editando}
                disabled={!editando}
                onChange={(event) => {
                  setPromocion({...promocionObj, fecha_fin: event})
                  setCambioDatos(true)
                }}
                label="Fecha Fin:"
              />
            </Grid.Col>

          </Grid>

          <br></br>

          <Textarea 
            readOnly={!editando}
            disabled={!editando}
            onChange={(event) => {
              setPromocion({...promocionObj, descripcion: event.target.value})
              setCambioDatos(true)
            }}
            value={promocionObj.descripcion}
            placeholder="Promoción para incentivar el uso de la estación
            en esta hora de poco uso"
            label="Descripción"      
            minRows={4}
            maxRows={6}
          /> 

          <br></br>

          <Button style={{backgroundColor: 'red'}} onClick={handleBorrarPromocion} disabled={editando}>
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