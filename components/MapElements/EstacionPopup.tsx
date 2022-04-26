import { Popup } from "react-leaflet";
import { Button } from "@mantine/core";
import { MarkerEstacionProps } from "../../interfaces";
import Link from 'next/link';

//component={Link} leftIcon={<ExternalLink size={14} />} href={`/admin/estaciones/${estacion.name.replace(" ","")}`}
// ({ name, ubicacion, state }: MarkerEstacionProps)
const EstacionPopup = (props:any) => {
  const estacion: MarkerEstacionProps = props.estacion;

  return (
    <Popup closeButton>
      <div>
        <h3>{estacion.name}</h3>
        <h4>{estacion.ubicacion}</h4>
        <p>Estado:{estacion.state}</p>
        <p>Plazas:{estacion.nOcupadas}/{estacion.nplazas}</p>
        <p>Kwh:{estacion.kwh}</p>
        <Button fullWidth >          
          <Link  href={`/admin/estaciones/${estacion.name.replace(" ","")}`}>Más</Link>            
        </Button>
        
      
      </div>
    </Popup>
  );
};

export default EstacionPopup;
