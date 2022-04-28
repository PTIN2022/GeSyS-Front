import { UnstyledButton, Group, Text } from "@mantine/core";
import Link from "next/link";
import { NavbarItemProps } from "./BaseAdministracion";

const NavbarButton = ({ label, href }: NavbarItemProps) => {
  return (
    <Link href={href} passHref={true}>
      <UnstyledButton 
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          backgroundColor: theme.colorScheme === 'light' ? theme.primaryColor : theme.colors.dark[0],
          color: theme.colorScheme === 'light' ? theme.black : theme.colors.dark[0],
          marginBottom: theme.spacing.xs,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.dark[6],
          },
        })}
      >
        <Text size="md">{label}</Text>
      </UnstyledButton>
    </Link>
  )
}

export default NavbarButton;