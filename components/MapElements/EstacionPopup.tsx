import { Popup } from "react-leaflet";
import { Button } from "@mantine/core";
import { MarkerEstacionProps } from "../../interfaces";

const EstacionPopup = ({ name, ubicacion, state }: MarkerEstacionProps) => {

  return (
    <Popup>
      <div>
        <h3>{name}</h3>
        <h2>{ubicacion}</h2>
        <p>{state}</p>
        <Button>Disable</Button>
      </div>
    </Popup>
  );
};

export default EstacionPopup;
