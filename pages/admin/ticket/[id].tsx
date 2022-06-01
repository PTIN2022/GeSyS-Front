import { NextPage } from "next";
import { useRouter } from "next/router";

const Ticket: NextPage = () => {

  const { query } = useRouter();
  const { id } = query;

  return (
    <>
      <h1>Ticket {id}</h1>
    </>
  )

}

export default Ticket;
