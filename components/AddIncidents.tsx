import { useForm, formList } from '@mantine/form';
import { TextInput, Group, ActionIcon, Box, Text, Button, Code, Autocomplete } from '@mantine/core';
import { Hash, Trash } from 'tabler-icons-react';
import { useState } from 'react';

export interface IncidenciaElement {
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
    validate: () => ({
      planta: planta == '' ? 'Debe ingresar una planta' : null,
      plaza: plaza == '' ? 'Debe ingresar una plaza' : null,
      texto: texto == '' ? 'Debe ingresar una texto' : null,
    })
  });

  const handleSubmitAddIncidencia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.validateField('planta').hasError && !form.validateField('plaza').hasError && !form.validateField('texto').hasError) {
      form.addListItem("incidencias", {planta: planta, plaza: plaza, texto: texto})
      setplanta('')
      setplaza('')
      settexto('')
    }
  }

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
    <Box sx={{ maxWidth: 500 }}>
      <form onSubmit={(e) => handleSubmitAddIncidencia(e)}>
        <Group mt={"xs"} mb={"xs"} align={"end"}>
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

          <Button type='submit'>
            Nueva Incidencia
          </Button>
        </Group>
      </form>

      <Autocomplete 
        label="Buscador de incidencias"
        placeholder="Search..."
        icon={<Hash />} 
        data={['Planta1']} 
      />
      
      <hr />
      
      {fields.length <= 0 ? (
        <Text color="dimmed" align="center">
          Sin incidencias
        </Text>
      ) : (
        fields
      )}

    </Box>
  );
}

export default AddIncidents;