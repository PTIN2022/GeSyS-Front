import { ActionIcon, Button, Center, Menu } from "@mantine/core"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Circle, DotsVertical, Trash } from "tabler-icons-react"
import { EstacionRowProps, EstState } from "../pages/admin/estaciones"
import EditState from "./EditState"



const FilaEstacion = ({ Dir, Est, Kwh, Oc, enc, m2 , id, state} : EstacionRowProps) => {
//const FilaEtacion = (props: any) => {
 // const est: EstacionRowProps = props.est;
  const [menuOpened,setMenu] = useState(false);
  const [estado,setEstado] = useState(state);
  useEffect (() =>{
    if (EstState.includes(state)){
      setEstado(state);
    }
  },[state])
  const tancaMenu =() =>{
    setMenu(!menuOpened)
  }
  const changeState = (newState:string) => {
    if (EstState.includes(newState)){
      setEstado(newState);
    }
  }
  return (        
    <tr>
      <td>
        {estado=='Activa' && <Circle fill={"#00b900"}/>}   
        {estado=='Dañada' && <Circle fill={"#ffb044"} />}   
        {estado=='Inactiva' && <Circle fill={"#bf2200"} />}
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
            <EditState state={state} id={id} menu={tancaMenu} actualitza={changeState}  />
            </Menu.Item> 
        </Menu>   

      </td>
      
    </tr>
  )
} 

export default FilaEstacion