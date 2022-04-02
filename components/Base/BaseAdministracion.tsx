import { Group,  UnstyledButton, AppShell, Burger, Header, MediaQuery, Navbar, Text, Avatar, Space, Button } from "@mantine/core";
import { AppProps } from "next/app";
import { useState } from "react";
import { NavbarItemProps } from "../../interfaces";
import NavbarButton from "./NavbarButton";

const NavbarItems: NavbarItemProps[] = [
  {
    label: "Estaciones",
    href: "/admin/estaciones",
  },
  {
    label: "Trabajadores",
    href: "/admin/trabajadores",
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
    label: "Soporte tecnico",
    href: "/admin/soporte_tecnico",
  }
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
          <Header height={60} p="sm">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((e) => !e)}
                  size="sm"
                  mr="xl"
                />
              </MediaQuery>
              <Button
                variant="subtle" 
                color='#0e3bac'
                component="a"
                target="_self"
                href= "/admin"
              >
                GeSyS Technical Station</Button>
              <Space w="sm"></Space>
              <UnstyledButton 
                component="a"
                target="_self"
                href= "/admin/perfil"
              >
                <Group>
                  <Text>Manolo</Text>
                  <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80.png" radius="xl" > </Avatar>
                </Group>
              </UnstyledButton>
              
            </div>
          </Header>
        }
        navbar={
          <Navbar width={{ sm: 300 }} p="xs" hiddenBreakpoint={"sm"} hidden={!opened}>
            {NavbarItems && NavbarItems.map((navbaritem, index) => {
              return <NavbarButton key={index} {...navbaritem} />
            })}
          </Navbar>
        }
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.dark[8] },
        })}
      >
        <Component {...pageProps} />
      </AppShell>
  )
}

export default BaseAdministracion;