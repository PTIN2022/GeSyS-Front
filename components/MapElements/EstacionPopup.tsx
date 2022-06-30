import { Popup } from "react-leaflet";
import { Button } from "@mantine/core";
import Link from 'next/link';
import { MarkerEstacionProps } from "./Map";

//component={Link} leftIcon={<ExternalLink size={14} />} href={`/admin/estaciones/${estacion.name.replace(" ","")}`}
// ({ name, ubicacion, state }: MarkerEstacionProps)
const EstacionPopup = (props:any) => {
  const estacion: MarkerEstacionProps = props.estacion;

  return (
    <Popup closeButton>
      <div>
        <h3>{estacion.nombre_est}</h3>
        <p>Estado:{estacion.estado}</p>
        <p>Plazas:{estacion.ocupation_actual}/{estacion.capacidad}</p>
        <p>Kwh contratada:{estacion.potencia_contratada}</p>
        <p>Kwh usada:{estacion.potencia_usada}</p>
                  
          <Link  href={`/admin/estaciones/${estacion.id_estacion}`} passHref={true}>
            <Button fullWidth >Más</Button>
          </Link>            
        
        
      
      </div>
    </Popup>
  );
};

export default EstacionPopup;
