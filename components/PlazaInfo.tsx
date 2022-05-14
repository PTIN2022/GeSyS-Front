import { Paper, ThemeIcon } from "@mantine/core";
import { Car , Ban } from "tabler-icons-react";
import { PlazaData } from "../pages/admin/estaciones/[estacion]";


const PlazaInfo = ({id_cargador, estado}:PlazaData) => {
 let libre = estado == "cargando" ? true : false;
    return (
    <>
            { libre ?          
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: {id_cargador}  
              <ThemeIcon color="teal" size={24} radius="xl">
                <Car size={16} />
              </ThemeIcon>
            </Paper>
            :
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: {id_cargador}  
              <ThemeIcon color="red" size={24} radius="xl">
                <Ban size={16} />
              </ThemeIcon>
            </Paper>
            }

    </>
    )
}

export default PlazaInfo;