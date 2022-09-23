import { LatLngExpression } from 'leaflet';

export const convertCoordsToLatLng = (
  coords: number[],
): LatLngExpression => coords as LatLngExpression;

export const convertPolylineToLatLng = (
  polyline: number[][],
): LatLngExpression[] => polyline as LatLngExpression[];
