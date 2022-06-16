import { ActionIcon, Button, Center, Menu } from "@mantine/core"
import Link from "next/link"
import { useState } from "react"
import { Circle, DotsVertical, Trash } from "tabler-icons-react"
import { EstacionRowProps } from "../pages/admin/estaciones"
import EditState from "./EditState"



const FilaEstacion = ({ Dir, Est, Kwh, Oc, enc, m2 , id, state} : EstacionRowProps) => {
//const FilaEtacion = (props: any) => {
 // const est: EstacionRowProps = props.est;
const [menuOpened,setMenu] = useState(false);
const tancaMenu =() =>{
  setMenu(!menuOpened)
}
  return (        
    <tr>
      <td>
        {state=='Activa' && <Circle fill={"#00b900"}/>}   
        {state=='Dañada' && <Circle fill={"#ffb044"} />}   
        {state=='Inactiva' && <Circle fill={"#bf2200"} />}
        </td>
      <td>{Est}</td>
      <td>{Dir}</td>
      <td>{Kwh}</td>
      <td>{Oc}</td>
      <td>{m2}</td>
      <td>{enc}</td>
      <td>
       <Menu opened={menuOpened} control={
          <Center  style={{ width: 10, height: 40 }}>
              <ActionIcon onClick={() => setMenu(!menuOpened)} color="dark" radius="md">
                  <DotsVertical />
              </ActionIcon>
          </Center>
          }>
          <Link href={`http://localhost:3000/admin/estaciones/${id}`}  passHref={true}>
                  <Menu.Item>Ver más</Menu.Item>
              </Link>
          <Menu.Item >
            <EditState state={state} id={id} menu={tancaMenu}/>
            </Menu.Item> 
        </Menu>   
      </td>
    </tr>
  )
} 

export default FilaEstacion