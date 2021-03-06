import { Group, Text } from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { MensajeTicket } from "../../pages/admin/ticket/[id]";



const Mensaje = ({ contenido, date, id_mensaje, id_ticket, id_usuari } : MensajeTicket) => {

  date = new Date(date);
  const { user } = useContext(AuthContext)

  return (
    <div style={id_usuari == user.id_usuari ? { marginLeft: '25%', borderRadius: '0.5em', backgroundColor: '#0D38A3' } : { marginRight: '25%', borderRadius: '0.5em', backgroundColor: '#3E70EF' }}>
      <Group style={{ justifyContent: 'space-between', paddingLeft: '1em', paddingTop: '0.5em', paddingBottom: '0.5em', paddingRight: '1em' }}>
        <Text style={{ color: 'white', fontWeight: '900' }}>{id_usuari == user.id_usuari ? 'Tú' : `Cliente id. ${id_usuari}`}</Text>
        <Text style={{ color: 'white' }}>{date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" })}</Text>
      </Group>
      <Group style={{ padding: '1em', marginBottom: '1em', borderTop: '1px solid white' }} position="apart" spacing="sm">
        <Group style={{ width: '100%' }}>
          <Text style={{ color: 'white', width: '100%', wordWrap: 'break-word' }}>{contenido}</Text>
        </Group>
      </Group>
    </div>
  )
}

export default Mensaje;