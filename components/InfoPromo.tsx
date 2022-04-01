import { Textarea } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const InfoPromo = () => {

    const [value, setValue] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://api.publicapis.org/entries");
            const data =  await response.json();
            setValue(JSON.stringify(data))
        }
        fetchData();
    }, [])

    return(
        <>
          <h1>Promocion</h1>
          <Textarea readOnly={true} value={value}
          placeholder="Promoción para incentivar el uso de la estación
          en esta hora de poco uso"
          label="Descripción"      
          minRows={4}
          maxRows={6}      
          /> 
        </>
    )
}

export default InfoPromo;