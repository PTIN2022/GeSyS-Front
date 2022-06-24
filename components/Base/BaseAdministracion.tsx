import {
  Group,
  UnstyledButton,
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
  Avatar,
  Space,
  Button,
  Menu
} from "@mantine/core";
import { AppProps } from "next/app";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { PerfilData } from "../../pages/admin/perfil";
import UserButton from "../UserButton";
import NavbarButton from "./NavbarButton";

export interface NavbarItemProps {
  label: string;
  href: string;
}


const NavbarItems: NavbarItemProps[] = [
  {
    label: "Inicio",
    href: "/admin/",
  },
  {
    label: "Estaciones",
    href: "/admin/estaciones",
  },
  {
    label: "Trabajadores",
    href: "/admin/trabajadores",
  },
  {
    label: "Reservas",
    href: "/admin/reservas",
  },
  {
    label: "Estadisticas",
    href: "/admin/estadisticas",
  },
  {
    label: "Promociones",
    href: "/admin/promociones",
  },
  {
    label: "Averías",
    href: "/admin/averias",
  },
  {
    label: "Clientes",
    href: "/admin/clientes",
  },
  {
    label: "Soporte tecnico",
    href: "/admin/soporte_tecnico",
  },
];

const BaseAdministracion = (props: AppProps) => {
  

  const { user, logout } = useContext(AuthContext);
  const [ profile, setProfile ] = useState<PerfilData>(user!)

  useEffect(() => {
    setProfile(user!)
  }, [user])

  const [opened, setOpened] = useState<boolean>(false);
  const { Component, pageProps } = props;
  return (
    <AppShell
      padding="xs"
      navbarOffsetBreakpoint={"sm"}
      fixed
      header={
        <Header height={60} p="sm" 
          styles={{
            root: { backgroundColor: '#ccdde8' },
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%", 
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((e) => !e)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>
            <Link href={"/admin"} passHref={true}>
              <Button variant="subtle" color="blue"
                styles={{
                  root: {
                      color:"black",
                      backgroundColor: '#ccdde8',
                    },
                  }}
              >
                <Avatar size={"sm"} mr={"lg"} src={"/img/logofeo.png"} />
                GeSyS Technical Station
              </Button>
            </Link>

            <Space w={"sm"}></Space>

            <Group position="center">
              <Menu
                withArrow
                placement="center"
                control={
                  <UserButton
                    image={profile.pfp}
                    name={profile.nombre + " " + profile.apellido}
                    email={profile.email}
                  />
                }
              >
                <Link href={"/admin/perfil"} passHref={true}>
                  <Menu.Item>Mi perfil</Menu.Item>
                </Link>

                <Link href={"/"} passHref={true}>
                  <Menu.Item onClick={() => logout()}>Cerrar sesión</Menu.Item>
                </Link>
              </Menu>
            </Group>
          </div>
        </Header>
      }
      navbar={
        <Navbar
        styles={{
          root: { backgroundColor: '#ccdde8' },
        }}
          width={{ sm: 300 }}
          p="xs"
          hiddenBreakpoint={"sm"}
          hidden={!opened}
        >
          {NavbarItems &&
            NavbarItems.map((navbaritem, index) => {
              if ( profile.cargo== "trabajador" && 
              navbaritem.label != "Estaciones" &&  
              navbaritem.label != "Promociones" &&
              navbaritem.label != "Estadisticas")
                  return <NavbarButton closeBurger={setOpened} key={index} {...navbaritem} />;
              else if ( profile.cargo != "trabajador")
                return <NavbarButton closeBurger={setOpened} key={index} {...navbaritem} />;
            })}
            
        </Navbar>
      }
      styles={(theme) => ({
        main: {    
         backgroundColor:
            theme.colorScheme === "light"
              ? theme.colors.gray[0]
              : theme.colors.dark[8],
        },       
      })}
    >
      <Component {...pageProps} />
    </AppShell>
  );
};

export default BaseAdministracion;
