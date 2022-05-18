import { useForm, formList } from '@mantine/form';
import { TextInput, Group, ActionIcon, Box, Text, Button, Code, Autocomplete } from '@mantine/core';
import { Hash, Trash } from 'tabler-icons-react';
import { useState } from 'react';

export interface IncidenciaElement {
  descripcion: string;
  plaza: string;
}

const AddIncidents = () => {

  const [value, setValue] = useState(''); 
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
            placeholder="24"
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
        label="Buscador de incidencias por plaza"
        placeholder="123"
        icon={<Hash />} 
        value={value} onChange={setValue} data={form.values.incidencias.map((item) => ({ ...item, value: item.plaza}))}
        rightSection={<ActionIcon color="red" variant="hover" onClick={() => setValue('')}><Trash size={16} /></ActionIcon>}      
      />
      
      <hr />
      
      {fields.length <= 0 ? (
        <Text color="dimmed" align="center">
          Sin incidencias
        </Text>
      ) : (
        value.length <= 0 ? (
          fields
        ) : (
          // Filtrar form.values.plaza === value y mostrar form.values.descripcion
          form.values.incidencias.filter((item) => item.plaza === value).map((item, index) => (
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
          ))
        )
        )}
    </Box>
  );
};



export default AddIncidents;