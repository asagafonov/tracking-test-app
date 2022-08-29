import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  MapContainer, TileLayer, Marker, Popup, Polyline, useMap,
} from 'react-leaflet';
import PropTypes from 'prop-types';

const Controls = ({ coords }) => {
  const map = useMap();
  const zoom = 10;

  useEffect(() => {
    map.setView(coords, zoom);
  }, [coords]);

  return null;
};

const Map = () => {
  const defaultCenterCoords = [55.751442, 37.615569];
  const [centerCoords, setCenterCoords] = useState(defaultCenterCoords);

  const { from, to, polyline } = useSelector((state) => state.points.activeRouteData);
  const colorOptions = { color: '#407FC3' };

  useEffect(() => {
    if (polyline) {
      setCenterCoords(polyline[Math.round(polyline.length / 2)]);
    }
  }, [polyline]);

  return (
    <MapContainer
      center={centerCoords}
      zoom={11}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '580px' }}
    >
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Controls coords={centerCoords} />
      {from && (
        <Marker position={[from.lat, from.lng]}>
          {from?.name && <Popup>{`Погрузка: ${from.name}`}</Popup>}
        </Marker>
      )}
      {to && (
        <Marker position={[to.lat, to.lng]}>
          {to?.name && <Popup>{`Разгрузка: ${to.name}`}</Popup>}
        </Marker>
      )}
      {polyline && (
        <Polyline pathOptions={colorOptions} positions={polyline} />
      )}
    </MapContainer>
  );
};

Controls.propTypes = {
  coords: PropTypes.array,
};

export default Map;
