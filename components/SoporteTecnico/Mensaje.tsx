import { Group, Text } from "@mantine/core";
import { MensajeTicket } from "../../pages/admin/ticket/[id]";



const Mensaje = ({ contenido, date, id_mensaje } : MensajeTicket) => {


  date = new Date(date);

  return (
    <div style={id_mensaje % 2 == 0 ? { marginLeft: '25%', backgroundColor: '#0D38A3' } : { marginRight: '25%', backgroundColor: '#3E70EF' }}>
      <Text style={{ color: 'white', fontWeight: '600' }}>{id_mensaje % 2 == 0 ? 'ASDASD'  : 'RODSRIGO'}</Text>
      <Group style={{ padding: '1em', marginBottom: '1em', border: '1px solid white' }} position="apart" spacing="sm">
        <Text style={{ color: 'white' }}>{contenido}</Text>
        <Text style={{ color: 'white' }}>{date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" })}</Text>
      </Group>
    </div>
  )
}

export default Mensaje;