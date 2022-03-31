import { AppShell, Burger, Header, MediaQuery, Navbar, Text } from "@mantine/core";
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
          <Header height={70} p="sm">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((e) => !e)}
                  size="sm"
                  mr="xl"
                />
              </MediaQuery>
              <Text align='right'>Application header</Text>
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