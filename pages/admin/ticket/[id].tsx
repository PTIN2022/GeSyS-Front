import { Center, Grid } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Chat from "../../../components/SoporteTecnico/Chat";


export interface MensajeTicket {
  contenido: string;
  date: Date;
  id_mensaje: number;
}

export interface TicketInterface {
  Mensajes: MensajeTicket[];
  mensaje: string;
  estado: boolean,
  fecha: Date;
  ticket_id: number;
}

const Ticket: NextPage = () => {

  const { query } = useRouter();
  const { id } = query;

  const [ticket, setTicket] = useState<TicketInterface>();

  // Fetch datos de la API
  useEffect(() =>{
    const fetchDatos = async () => {
      const response = await fetch(`http://craaxkvm.epsevg.upc.es:23601/api/soporte/${id}`);
      const data = await response.json() as TicketInterface;
      data.fecha = new Date(data.fecha);

      setTicket(data);
    }
    if (id) {
      fetchDatos();      
    }
  }, [id])

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
        <Grid.Col span={8}>
          <h3>
            {ticket?.mensaje}
          </h3>
        </Grid.Col>
        <Grid.Col span={4}>
          <h3>
            {ticket && ticket.fecha && ticket.fecha.toLocaleString()} (Hace {ticket && ticket.fecha && dateToHaceCuanto(new Date(ticket?.fecha))})
          </h3>
        </Grid.Col>
        <Grid.Col span={12}>
          <Chat ticket_id={id as string} />
        </Grid.Col>
      </Grid>
    </>
  )

}

export default Ticket;
