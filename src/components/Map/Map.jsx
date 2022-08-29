import React from 'react';
import { useSelector } from 'react-redux';
import {
  MapContainer, TileLayer, Marker, Popup, Polyline,
} from 'react-leaflet';

const Map = () => {
  const centerCoords = [55.751442, 37.615569];

  const { from, to, polyline } = useSelector((state) => state.points.activeRouteData);
  const colorOptions = { color: '#407FC3' };

  return (
    <MapContainer
      center={centerCoords}
      zoom={9}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '580px' }}
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
      {polyline && (
        <Polyline pathOptions={colorOptions} positions={polyline} />
      )}
    </MapContainer>
  );
};

export default Map;
