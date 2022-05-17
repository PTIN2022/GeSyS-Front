import { useForm, formList } from '@mantine/form';
import { TextInput, Group, ActionIcon, Box, Text, Button, Code, Autocomplete } from '@mantine/core';
import { Hash, Trash } from 'tabler-icons-react';
import { useState } from 'react';

export interface IncidenciaElement {
  descripcion: string;
  plaza: string;
}

const AddIncidents = () => {

  const [descripcion, setdescripcion] = useState('')
  const [plaza, setplaza] = useState('')

  const form = useForm({
    initialValues: {
      incidencias: formList<IncidenciaElement>([]),
    },
    validate: () => ({
      descripcion: descripcion == '' ? 'Debe ingresar una descripcion' : null,
      plaza: plaza == '' ? 'Debe ingresar una plaza' : null,
    })
  });

  const handleSubmitAddIncidencia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.validateField('descripcion').hasError && !form.validateField('plaza').hasError) {
      form.addListItem("incidencias", {descripcion: descripcion, plaza: plaza})
      setdescripcion('')
      setplaza('')
    }
  }

  const fields = form.values.incidencias.map((_, index) => (
    <Group key={index} mt="xs">
      <TextInput
        readOnly
        placeholder="Plaza"
        sx={{ flex: 1 }}
        {...form.getListInputProps('incidencias', index, 'plaza')}
      />
      <TextInput
        readOnly
        placeholder="Descripcion"
        sx={{ flex: 1 }}
        {...form.getListInputProps('incidencias', index, 'descripcion')}
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
            placeholder="Plaza4"
            label="Num Plaza"
            sx={{ flex: 1 }}
            value={plaza} 
            onChange={(event) => setplaza(event.currentTarget.value)}
          />

          <TextInput
            placeholder="descripcion1"
            label="Descripcion"
            sx={{ flex: 1 }}
            value={descripcion} 
            onChange={(event) => setdescripcion(event.currentTarget.value)}
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
        data={[]} 
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