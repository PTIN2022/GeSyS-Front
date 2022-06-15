import { Button, TextInput } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { MensajeTicket, TicketInterface } from "../../pages/admin/ticket/[id]";
import Mensaje from "./Mensaje";

const Chat = (props: { ticket_id: string }) => {

  const { user } = useContext(AuthContext)

  const [mensajes, setMensajes] = useState<MensajeTicket[]>([]);
  const [textMensaje, settextMensaje] = useState<string>("");

  const endScroll = useRef<HTMLDivElement>(null);

  const fetchDatos = async () => {
    const response = await fetch(`http://craaxkvm.epsevg.upc.es:23601/api/soporte/${props.ticket_id}`);
    const data = await response.json() as TicketInterface;
    setMensajes(data.Mensajes);
    scrollToBottomInstant();
  }

  const fetchInterval = useInterval(fetchDatos, 5000);

  const scrollToBottomSmooth = () => {
    endScroll.current!.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBottomInstant = () => {
    endScroll.current!.scrollIntoView();
  };

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
    form.append("cliente", user.id.toString());

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
      scrollToBottomSmooth();
    })
    .catch((error) => {
      alert(error);
    });
    
  }

  return (
    <div>
      <div style={{ maxHeight: '30em', overflow: 'auto' }}>
        {
          mensajes && mensajes.map((mensaje, i) => {
            return (
              <Mensaje key={i} {...mensaje} />
            )
          })
        }
        <div ref={endScroll}></div>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} style={{ marginTop: '0.5em', display: 'flex' }}>
        <TextInput style={{ justifyContent: 'stretch', width: '100%' }} value={textMensaje} onChange={(event) => settextMensaje(event.currentTarget.value)} placeholder="Mensaje" required />
        <Button style={{ marginLeft: '0.5em'}} type="submit">Enviar</Button>
      </form>
    </div>
  )
}

export default Chat;