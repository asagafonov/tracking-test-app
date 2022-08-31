import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'leaflet';
import {
  MapContainer, TileLayer, Marker, Popup, Polyline, useMap,
} from 'react-leaflet';
import PropTypes from 'prop-types';

const Controls = ({ coords, overlayWidth }) => {
  const map = useMap();
  const zoom = 10;

  useEffect(() => {
    const targetPoint = map.project(coords, zoom).add([overlayWidth / 2, 0]);
    const targetLatLng = map.unproject(targetPoint, zoom);
    map.setView(targetLatLng, zoom);
  }, [coords]);

  return null;
};

const Map = ({ overlayWidth }) => {
  const defaultCenterCoords = [55.753955, 37.620616];
  const [centerCoords, setCenterCoords] = useState(defaultCenterCoords);

  const { from, to, polyline } = useSelector((state) => state.points.activeRouteData);

  useEffect(() => {
    if (polyline) {
      setCenterCoords(polyline[Math.round(polyline.length / 2)]);
    }
  }, [polyline]);

  const fromIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2979/2979590.png',
    iconSize: [35, 35],
  });

  const toIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/411/411712.png',
    iconSize: [40, 40],
  });

  return (
    <MapContainer
      center={centerCoords}
      zoom={11}
      scrollWheelZoom={false}
      style={{ width: '100%', minHeight: '550px', height: `${window.innerHeight * 0.80}px` }}
    >
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Controls coords={centerCoords} overlayWidth={overlayWidth} />
      {from && (
        <Marker position={[from.lat, from.lng]} icon={fromIcon}>
          {from?.name && <Popup>{`Погрузка: ${from.name}`}</Popup>}
        </Marker>
      )}
      {to && (
        <Marker position={[to.lat, to.lng]} icon={toIcon}>
          {to?.name && <Popup>{`Разгрузка: ${to.name}`}</Popup>}
        </Marker>
      )}
      {polyline && (
        <Polyline pathOptions={{ color: '#407FC3' }} positions={polyline} />
      )}
    </MapContainer>
  );
};

Map.propTypes = {
  overlayWidth: PropTypes.number,
};

Controls.propTypes = {
  coords: PropTypes.array,
  overlayWidth: PropTypes.number,
};

export default Map;
