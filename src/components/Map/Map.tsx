import React, { useState, useEffect } from 'react';
import { Icon } from 'leaflet';
import {
  MapContainer, TileLayer, Marker, Popup, Polyline, useMap,
} from 'react-leaflet';

import { convertCoordsToLatLng, convertPolylineToLatLng } from '../../app/helpers/convertTypes';
import { useAppSelector } from '../../app/hooks';

const Controls = ({ coords, overlayWidth }: { coords: number[]; overlayWidth: number }) => {
  const map = useMap();
  const zoom = 10;

  useEffect(() => {
    const targetPoint = map.project(convertCoordsToLatLng(coords), zoom).add([overlayWidth / 2, 0]);
    const targetLatLng = map.unproject(targetPoint, zoom);
    map.setView(targetLatLng, zoom);
  }, [coords]);

  return null;
};

const Map = ({ overlayWidth }: { overlayWidth: number }) => {
  const defaultCenterCoords: number[] = [55.753955, 37.620616];
  const [centerCoords, setCenterCoords] = useState<number[]>(defaultCenterCoords);

  const activeRouteData = useAppSelector((state) => state.points.activeRouteData);
  const { from, to, polyline } = activeRouteData || {};

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
      center={convertCoordsToLatLng(centerCoords)}
      zoom={11}
      scrollWheelZoom={false}
      style={{ width: '100%', minHeight: '550px', height: `${window.innerHeight * 0.8}px` }}
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
        <Polyline pathOptions={{ color: '#407FC3' }} positions={convertPolylineToLatLng(polyline)} />
      )}
    </MapContainer>
  );
};

export default Map;
