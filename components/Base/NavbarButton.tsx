import { UnstyledButton, Group, Text, MantineProvider } from "@mantine/core";
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
          backgroundColor: theme.fn.darken('#0e3bac', 0.05),
          color: theme.colorScheme === 'light' ? theme.black : theme.colors.dark[0],
          marginBottom: theme.spacing.xs,

          '&:hover': {
            backgroundColor: '#1c7ed6',
          },
        })}
      >
        <Text size="md" color={'white'}>{label}</Text>
      </UnstyledButton>
    </Link>
  )
}

export default NavbarButton;