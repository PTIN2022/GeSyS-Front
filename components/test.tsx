import { useForm, formList } from '@mantine/form';
import { TextInput, Switch, Group, ActionIcon, Box, Text, Button, Code } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { useState } from 'react';

interface IncidenciaElement {
  planta: string;
  plaza: string;
  texto: string;
}



const AddIncidents = () => {

  const [planta, setplanta] = useState('')
  const [plaza, setplaza] = useState('')
  const [texto, settexto] = useState('')

  const form = useForm({
    initialValues: {
      incidencias: formList<IncidenciaElement>([]),
    },
  });


  const fields = form.values.incidencias.map((_, index) => (
    <Group key={index} mt="xs">
      <TextInput
      readOnly
        placeholder="Planta"
        sx={{ flex: 1 }}
        {...form.getListInputProps('incidencias', index, 'planta')}
      />
      <TextInput
      readOnly
        placeholder="Plaza"
        sx={{ flex: 1 }}
        {...form.getListInputProps('incidencias', index, 'plaza')}
      />
      <TextInput
      readOnly
        placeholder="Incidencia"
        sx={{ flex: 1 }}
        {...form.getListInputProps('incidencias', index, 'texto')}
      />
      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => form.removeListItem('incidencias', index)}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      {fields.length > 0 ? (
          <Text weight={500} size="sm" sx={{ flex: 1 }}>
            Incidencias
          </Text>
      ) : (
        <Text color="dimmed" align="center">
          Sin incidencias
        </Text>
      )}
    
    
    
    <Group mt="xs">
      <TextInput
        placeholder="Planta1"
        label="Num Planta"
        sx={{ flex: 1 }}
        value={planta} 
        onChange={(event) => setplanta(event.currentTarget.value)}
      />
      <TextInput
        placeholder="Plaza4"
        label="Num Plaza"
        sx={{ flex: 1 }}
        value={plaza} 
        onChange={(event) => setplaza(event.currentTarget.value)}
      />
      <TextInput
        placeholder="Fallo en ..."
        label="Incidencia"
        sx={{ flex: 1 }}
        value={texto} 
        onChange={(event) => settexto(event.currentTarget.value)}
    />

    </Group>
    <br></br>
    <Button onClick={() => {
      setplanta('');
      setplaza('');
      settexto('');
      form.addListItem("incidencias", {planta: planta, plaza: plaza, texto: texto})}
      }>
      Nueva Incidencia
    </Button>

      {fields}

      <Text size="sm" weight={500} mt="md">
        Form values:
      </Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>
    </Box>
  );
}

export default AddIncidents;