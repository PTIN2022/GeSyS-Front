import { Grid, Paper, ThemeIcon } from "@mantine/core";
import { Car , Ban } from "tabler-icons-react";
import { PlazaData } from "../pages/admin/estaciones/[estacion]";


const PlazaInfo = ({id_cargador, estado}:PlazaData) => {
 let libre = estado == "ocupado" ? true : false;
    return (
    <>
    
      <Grid.Col sm={2}>
          
        { libre ?          
          <Paper shadow="sm" radius="md" p="xs">
            Plaza: {id_cargador}  
            <ThemeIcon color="red" size={24} radius="xl">
              <Ban size={16} />
            </ThemeIcon>
          </Paper>
          :
          <Paper shadow="sm" radius="md" p="xs">
            Plaza: {id_cargador}  
            <ThemeIcon color="teal" size={24} radius="xl">
              <Car size={16} />
            </ThemeIcon>
          </Paper>
          }
        </Grid.Col>
        
            
    </>
    )
}

export default PlazaInfo;