import L, { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const IconFuncionando: Icon = new L.Icon({
  iconUrl: '/img/icon_estacion_funcionando.png',
  iconSize: [34, 44],
  popupAnchor: [-3, -22]
});

const IconAveria: Icon = new L.Icon({
  iconUrl: '/img/icon_estacion_averia.png',
  iconSize: [34, 44],
  popupAnchor: [-3, -22]
});

const IconDesactivado: Icon = new L.Icon({
  iconUrl: '/img/icon_estacion_desactivado.png',
  iconSize: [34, 44],
  popupAnchor: [-3, -22]
});


export { IconFuncionando, IconAveria, IconDesactivado };