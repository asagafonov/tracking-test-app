import React from 'react';
import { useSelector } from 'react-redux';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

const Map = () => {
  const centerCoords = [55.751442, 37.615569];

  const { from, to } = useSelector((state) => state.points.activeRouteData);

  return (
    <MapContainer
      center={centerCoords}
      zoom={9}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '480px' }}
    >
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {from && (
        <Marker position={[from.lat, from.lng]}>
          {from?.name && <Popup>{from.name}</Popup>}
        </Marker>
      )}
      {to && (
        <Marker position={[to.lat, to.lng]}>
          {to?.name && <Popup>{to.name}</Popup>}
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
