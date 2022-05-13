import { Grid, Group, Paper, ThemeIcon } from "@mantine/core";
import { NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import { CircleCheck } from "tabler-icons-react";
import AddIncidents from "../../../components/AddIncidents";

const Estacion: NextPage = () => {

  const { query } = useRouter();
  const { estacion } = query;

  return (
    <>
      <Head>
        <title>Gesys - Estación: {estacion}</title>
      </Head>
      <div>Estación {estacion}</div>
      <Group position="center">
        <Grid gutter={"xs"}>
          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 1 -- Estado: 
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 2 -- Estado: 
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 3 -- Estado: 
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 4 -- Estado: 
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 5 -- Estado: 
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 6 -- Estado: 
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 7 -- Estado: 
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 8 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 9 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 10 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 11 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 12 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 13 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 14 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 15 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 16 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 17 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 18 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 19 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 20 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 21 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 22 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 23 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 24 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 25 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 26 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 27 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 28 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 29 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 30 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 31 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

          <Grid.Col span={3}>
            <Paper shadow="sm" radius="md" p="xs">
              Plaza: 32 -- Estado:
              <ThemeIcon color="teal" size={24} radius="xl">
                <CircleCheck size={16} />
              </ThemeIcon>
            </Paper>
          </Grid.Col>

        </Grid>
      </Group>
      <AddIncidents />
    </>
  )
}

export default Estacion;