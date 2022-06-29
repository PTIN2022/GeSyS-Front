import { Button, Center, Grid, Group, Select } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Chat from "../../../components/SoporteTecnico/Chat";
import { AuthContext } from "../../../contexts/AuthContext";
import { estadosTicket } from "../soporte_tecnico";


export interface MensajeTicket {
  contenido: string;
  date: Date;
  id_mensaje: number;
  id_ticket: number;
  id_usuari: number;
}

export interface TicketInterface {
  Mensajes: MensajeTicket[];
	asunto: string;
	estado: string;
	fecha: Date;
	id_cliente: number;
	id_ticket: number;
	mensaje: string;
}

const Ticket: NextPage = () => {

  const { requestAuthenticated } = useContext(AuthContext)

  const { query } = useRouter();
  const { id } = query;

  const [ticket, setTicket] = useState<TicketInterface>();

  const [estadoTicket, setEstadoTicket] = useState<string>('')
  const [showBotonGuardar, setShowBotonGuardar] = useState<boolean>(true)

  useEffect(() => {
    if (ticket?.estado == undefined) {
      return
    }
    setEstadoTicket(ticket.estado)
  }, [ticket])

  // Fetch datos de la API
  useEffect(() =>{
    const fetchDatos = async () => {
      const response = await fetch(`https://craaxkvm.epsevg.upc.es:23600/api/soporte/${id}`);
      const data = await response.json() as TicketInterface;
      data.fecha = new Date(data.fecha);

      setTicket(data);
    }
    if (id) {
      fetchDatos();      
    }
  }, [id])

  const handleChangeEstadoTicket = (value: string) => {
    setEstadoTicket(value)
  }

  const handleChangeTicketEstado = async () => {

    try {
      const res = await requestAuthenticated(`https://craaxkvm.epsevg.upc.es:23600/api/soporte/${id}`, 'application/json', {
        method: 'PUT',
        body: JSON.stringify({
          estado: estadoTicket
        })
      }) as Response
      const data = await res.json()

      if (res.status != 200 || data == null) {
        return alert('Error' + data.toString())
      }

      setTicket(data);

    } catch (err) {
      console.error(err)
    }

  }

  useEffect(() => {
    if (estadoTicket == ticket?.estado) {
      setShowBotonGuardar(true)
    }
    else {
      setShowBotonGuardar(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estadoTicket, ticket])

  const dateToHaceCuanto = (date: Date) => {
    const haceCuanto = new Date().getTime() - date.getTime();
    const segundos = Math.round(haceCuanto / 1000);
    const minutos = Math.round(haceCuanto / 1000 / 60);
    const horas = Math.round(haceCuanto / 1000 / 60 / 60);
    const dias = Math.round(haceCuanto / 1000 / 60 / 60 / 24);
    const meses = Math.round(haceCuanto / 1000 / 60 / 60 / 24 / 30);
    const anos = Math.round(haceCuanto / 1000 / 60 / 60 / 24 / 30 / 12);

    if (segundos < 60) {
      return `${segundos} segundos`;
    } else if (minutos < 60) {
      return `${minutos} minutos`;
    } else if (horas < 24) {
      return `${horas} horas`;
    } else if (dias < 30) {
      return `${dias} dias`;
    } else if (meses < 12) {
      return `${meses} meses`;
    } else {
      return `${anos} años`;
    }
  }

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <h1>Ticket {id}</h1>
        </Grid.Col>
        <Grid.Col span={4}>
          <h3>
            {ticket?.mensaje}
          </h3>
        </Grid.Col>
        <Grid.Col span={4}>
          <h3>
            {ticket && ticket.fecha && ticket.fecha.toLocaleString()} (Hace {ticket && ticket.fecha && dateToHaceCuanto(new Date(ticket?.fecha))})
          </h3>
        </Grid.Col>
        <Grid.Col span={8}>
          <h3>Estado: </h3>
          <Group>
            <Select data={estadosTicket} placeholder={'Estado del ticket'} onChange={handleChangeEstadoTicket} value={estadoTicket} />
            <Button style={{
              backgroundColor: 'green'
            }} hidden={showBotonGuardar} onClick={handleChangeTicketEstado}>Guardar</Button>
          </Group>
        </Grid.Col>
        <Grid.Col span={12}>
          <Chat ticket_id={id as string} />
        </Grid.Col>
      </Grid>
    </>
  )

}

export default Ticket;
