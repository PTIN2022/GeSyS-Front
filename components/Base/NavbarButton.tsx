import { UnstyledButton, Group, Text, MantineProvider } from "@mantine/core";
import Link from "next/link";
import { NavbarItemProps } from "./BaseAdministracion";

const NavbarButton = (props: any) => {

  const { closeBurger, href, label } = props;

  return (
    <Link href={href} passHref={true}>
      <UnstyledButton 
        onClick={() => closeBurger(false)}
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          backgroundColor: theme.fn.darken('#0e3bac', 0.05),
          color: "black",
          marginBottom: theme.spacing.xs,

          '&:hover': {
            backgroundColor: '#1c7ed6',
          },
        })}
      >
        <Text size="md"
          styles={{ root: {color:"white"} }}
        >
          {label}
        </Text>
      </UnstyledButton>
    </Link>
  )
}

export default NavbarButton;