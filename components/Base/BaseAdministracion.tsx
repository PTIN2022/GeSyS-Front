import { Group,  UnstyledButton, AppShell, Burger, Header, MediaQuery, Navbar, Text, Avatar, Space, Button } from "@mantine/core";
import { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NavbarItemProps } from "../../interfaces";
import NavbarButton from "./NavbarButton";
import { forwardRef } from 'react';
import { ChevronRight } from 'tabler-icons-react';
import { Menu } from '@mantine/core';
import { UserButtonProps } from "../../interfaces";

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

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <ChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
);

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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((e) => !e)}
                  size="sm"
                  mr="xl"
                />
              </MediaQuery>
              <Link href={"/admin"} passHref={true}>
                  <Button
                    variant="subtle" 
                    color='#0e3bac'>
                      <Avatar size={"sm"} mr={"lg"} src={"/img/logofeo.png"} />
                    GeSyS Technical Station
                  </Button>
              </Link>
            
              <Space w="sm"></Space>

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
                <Menu.Item component="a" href="/admin/perfil">
                  Mi perfil
                </Menu.Item>

                <Menu.Item component="a" href="/">
                  Cerrar sesión
                </Menu.Item>
            </Menu>
          </Group>
              
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