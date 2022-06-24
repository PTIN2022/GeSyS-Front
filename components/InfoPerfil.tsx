import { Image, Text, Box, Grid, Group, TextInput, Tooltip } from "@mantine/core";
import { NextPage } from "next";
import { useState } from "react";
import { AlertCircle, At, Id, IdBadge, Phone, User } from "tabler-icons-react";
import { PerfilData } from "../pages/admin/perfil";


const PerfilInfo = ({ token, username, pfp, nombre, apellido, telefono, email, dni, cargo, question, estacion, estado} : PerfilData) => {
    
    const rightSection = (
      <Tooltip label="Contacta con un administrador para editar este campo" position="top" placement="end" color="ccdde8">
        <AlertCircle size={16} style={{ display: 'block', opacity: 0.5 }} />
      </Tooltip>
    );
    
    return (
      <>
        <Box sx={{ maxWidth: 700 }} >
          <Grid grow gutter="xl">
  
            <Grid.Col span={4}>
              <Group> 
                      
                <Image
                    sx={{ width: '10em', border: '3px solid black', borderRadius: '20px' }}
                    radius="lg"
                    alt={"profile picture"}
                    src={pfp} />
              </Group>
  
              <Text align="left" size="lg">{nombre} {apellido}</Text>
            </Grid.Col>
  
            <Grid.Col span={7}>
              <Text align="left" size="xl"> Mi Cuenta  </Text>
              <Text align="left" size="sm">Mira y edita tu información personal a continuación  </Text>
            </Grid.Col>
        
            <Grid.Col span={7}>                
              <Group mt="sl">
  
              <TextInput size="md"
                    label="Nombre"
                    variant="default"
                    icon={<User size={14} />}
                    value={nombre}
                    disabled
                  />
                
  
                <TextInput size="md"
                  label="Apellido"
                  variant="default"
                  icon={<User size={14} />}
                  value={apellido}
                  disabled
                /> 
  
              </Group>
  
              <Group mt="lg">
  
              <TextInput size="md"
                  label="Numero de Telefono"
                  variant="default"
                  icon={<Phone size={14} />}
                  value={telefono}
                  disabled
                />
  
                <TextInput size="md"
                  label="DNI"
                  required
                  rightSection={rightSection} 
                  icon={<Id size={14} />}
                  variant="filled"
                  value={dni}
                  disabled
                />  
              </Group>
  
              <br></br>
  
              <Group mt="sl">
                <TextInput size="md"
                  label="Correo electronico"
                  required
                  rightSection={rightSection}
                  icon={<At size={14} />} 
                  variant="filled"
                  value={email}
                  disabled
                />
  
                <TextInput size="md"
                  label="Cargo de Empresa"
                  required
                  rightSection={rightSection} 
                  icon={<IdBadge size={14} />}
                  variant="filled"
                  value={cargo}
                  disabled
                />  
  
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
      </>
      );
    }
  
    export default PerfilInfo