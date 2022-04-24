import { NextPage } from "next"
import { useRouter } from "next/router";

const ShowReserva: NextPage = () => {

  const { query } = useRouter();
  const { reserva } = query;

  return (
    <>
    <h1>Reserva: {reserva}</h1>
    </>
    );
}

export default ShowReserva;