interface Point {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

interface Route {
  id: number;
  name: string;
  from: Point;
  to: Point;
  polyline?: Array<number[]>;
}

export {
  Point,
  Route,
};
