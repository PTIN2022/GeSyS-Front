import type { NextPage } from 'next'
import Head from 'next/head';
import { useForm, formList } from '@mantine/form';
import { Table, useMantineTheme, Modal, TextInput, Switch, Group, ActionIcon, Box, Text, Button, Title, Space } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { useState } from 'react';

const ListaClientes: NextPage = () => {

        const form = useForm({
            initialValues: {
              clientes: formList([{
                  nombre: "Manu",
                  email: "manu@gmail.com",
                  telefono: '+34 622533636',
                  active: false
                },
                {
                  nombre: "Gerard",
                  email: "gerard@gmail.com",
                  telefono: '+34 673323222',
                  active: false
                },
                {
                  nombre: "Manolo",
                  email: "manolo@gmail.com",
                  telefono: '+34 673273277',
                  active: true
                }, {
                  nombre: "Edu",
                  email: "Edu@gmail.com",
                  telefono: '+34 643273277',
                  active: 'true'
                }
              ])
            }
        });

        const elements = [{
          nombre: "Manu",
          email: "manu@gmail.com",
          telefono: '+34 622533636'
        }];

        const rows = elements.map((element) => (
            <tr key={element.nombre}>
                <td>{element.nombre}</td>
                <td>{element.email}</td>
                <td>{element.telefono}</td>
            </tr>
          ));

        const [opened, setOpened] = useState(false);
        const theme = useMantineTheme();

        const fields = form.values.clientes.map((_, index) => (
            <Group key={index} mt="xs">
            <TextInput
                placeholder="Nombre"
                required
                sx={{ flex: 1 }}
                {...form.getListInputProps('clientes', index, 'nombre')}
            />
            <TextInput
                placeholder="email"
                required
                sx={{ flex: 1 }}
                {...form.getListInputProps('clientes', index, 'email')}
            />
            <TextInput
                placeholder="telefono"
                required
                sx={{ flex: 1 }}
                {...form.getListInputProps('clientes', index, 'telefono')}
            />
            <Switch label="Active" {...form.getListInputProps('clientes', index, 'active')} />
            <ActionIcon color="red" variant="filled" onClick={() => form.removeListItem('clientes', index)}>
                <Trash size={16} />
            </ActionIcon>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Perfil Cliente"
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.25}>
                {
                  <Group> 
                    <Table striped highlightOnHover>
                        <thead>
                            <tr>
                            <th>nombre</th>
                            <th>Email</th>
                            <th>telefono</th>       
                            </tr>       
                        </thead>
                        <tbody>{rows}
                        </tbody>
                     </Table>
                </Group>

                }
            </Modal>
            <Button color="blue" onClick={() => setOpened(true)}>Detalles</Button>
            </Group>
        ));
        
        return (
          <>
            <Head>
                <title>GeSyS - Clientes</title>
            </Head>
            <Box>
              <Title order={1}> <Text  inherit component="span">Clientes </Text></Title>
              <Space  h={25}/>
              <Group position='center' mt="md">
                  <Button type='submit' color="blue"  onClick={() => form.addListItem('clientes', { nombre: '',email: '',telefono: '', active: false })}>
                  Nuevo Cliente
                  </Button>
              </Group>
              {fields.length > 0 ? (
                  <Group mb="xs">
                  <Text weight={500} size="sm" sx={{ flex: 1 }}>
                      Nombre
                  </Text>
                  <Text weight={500} size="sm" sx={{ flex: 1 }}>
                      Email
                  </Text>
                  <Text weight={500} size="sm" sx={{ flex: 1 }}>
                      telefono
                  </Text>
                  <Text weight={500} size="sm" pr={90}>
                      Estado
                  </Text>
                  <Text weight={500} size="sm" pr={90}>

                  </Text>
                  </Group>
              ) : (
                  <Text color="dimmed" align="center">
                  No hay clientes
                  </Text>
              )}
              {fields}
            </Box>
          </>
        );
  }

  export default ListaClientes;