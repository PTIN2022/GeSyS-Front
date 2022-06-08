import { Button, TextInput } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { FormEvent, useEffect, useState } from "react";
import { MensajeTicket } from "../../pages/admin/ticket/[id]";
import Mensaje from "./Mensaje";

const Chat = (props: { ticket_id: string }) => {

  const [mensajes, setMensajes] = useState<MensajeTicket[]>([]);
  const [textMensaje, settextMensaje] = useState<string>("");

  const fetchDatos = async () => {
    const response = await fetch(`http://craaxkvm.epsevg.upc.es:23601/api/soporte/${props.ticket_id}`);
    const data = await response.json();
    setMensajes(data.Mensajes);
    console.log('hey :)')
  }

  const fetchInterval = useInterval(fetchDatos, 5000);

  useEffect(() => {
    if (props.ticket_id) {
      fetchDatos();
      fetchInterval.start();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.ticket_id])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    form.append("mensaje", textMensaje);

    fetch(`http://craaxkvm.epsevg.upc.es:23601/api/soporte/${props.ticket_id}`, {
      method: 'POST',
      body: form,
      "headers": {
        "accept": "application/json"
      }
    })
    .then((datos) => datos.json())
    .then((datos) => {
      setMensajes(datos.Mensajes);
      settextMensaje("");
    })
    .catch((error) => {
      alert(error);
    });
    
  }

  return (
    <div>
      <div className="chat">
        {
          mensajes && mensajes.map((mensaje, i) => {
            return (
              <Mensaje key={i} {...mensaje} />
            )
          })
        }
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextInput value={textMensaje} onChange={(event) => settextMensaje(event.currentTarget.value)} placeholder="Mensaje" required />
        <Button type="submit">Enviar</Button>
      </form>
    </div>
  )
}

export default Chat;