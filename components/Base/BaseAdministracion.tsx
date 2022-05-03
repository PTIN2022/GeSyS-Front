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
  Menu, MantineProvider
} from "@mantine/core";
import { AppProps } from "next/app";
import Link from "next/link";
import { useState } from "react";
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
              <Button variant="subtle" color="blue">
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
                    image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                    name="Manolo Pedro Juan"
                    email="manolo.pedro.juan@gesys.com"
                  />
                }
              >
                <Link href={"/admin/perfil"} passHref={true}>
                  <Menu.Item>Mi perfil</Menu.Item>
                </Link>

                <Link href={"/"} passHref={true}>
                  <Menu.Item>Cerrar sesión</Menu.Item>
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
              return <NavbarButton key={index} {...navbaritem} />;
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
      <MantineProvider
        theme={{
          headings:{
            sizes: {
              h1: { fontSize: 40 },
              h3: { fontSize: 25 },
              h6: { fontSize: 12 },
            },
          } 
        }}   
   
        styles={{ 
          Button: { root: { backgroundColor :"#0e3bac" } }, 
          Text: {root: { color :"black"}}, //#0e3bac
        }}
      >
      <Component {...pageProps} />
      </MantineProvider>
    </AppShell>
  );
};

export default BaseAdministracion;
