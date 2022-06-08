import { Grid } from "@mantine/core";
import { MensajeTicket } from "../../pages/admin/ticket/[id]";



const Mensaje = ({  msg_id, user_id, mensaje, fecha } : MensajeTicket) => {
  return (
    <Grid>
      <Grid.Col span={12}>
        <h5>{user_id}</h5>
      </Grid.Col>
      <Grid.Col span={12}>
        <p>{mensaje}</p>
      </Grid.Col>
    </Grid>
  )
}

export default Mensaje;