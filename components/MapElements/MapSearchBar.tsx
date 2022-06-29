import { Select } from '@mantine/core';
import { LatLngExpression, map, Map } from 'leaflet';
import { forwardRef, useImperativeHandle } from 'react';
import { useMap } from 'react-leaflet';

export type MapSearchBarHandle = {
  MapSetView: (posicion: LatLngExpression) => void;
}

const MapSearchBar = forwardRef((_props, ref: any) => {

  const map = useMap();

  useImperativeHandle(ref, () => ({
    MapSetView(posicion: LatLngExpression){
      map.setView(posicion)
    }
  }))

  return null;
})

MapSearchBar.displayName = 'MapSearchBar'

export default MapSearchBar;