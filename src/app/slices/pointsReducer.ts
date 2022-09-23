import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Point,
  Route,
} from '../interfaces/store-interfaces';

interface PointsState {
  points: Array<Point>;
  routes: Array<Route>;
  activeRouteId: number;
  activeRouteData: Route;
  isFetching: boolean;
}

const initialState: PointsState = {
  points: [],
  routes: [],
  activeRouteId: -1,
  activeRouteData: null,
  isFetching: false,
};

export const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    setPoints: (state, action: PayloadAction<Point[]>) => {
      state.points = action.payload;
    },
    setRoutes: (state, action: PayloadAction<Route[]>) => {
      state.routes = action.payload;
    },
    updateRoutes: (state, action) => {
      const { routes } = state;
      const {
        type,
        routeId,
        pointFrom,
        pointTo,
      } = action.payload;

      const updatedRoutes = routes.map((route) => {
        if (Number(route?.id) === Number(routeId)) {
          if (type === 'from') {
            route.from = pointFrom;
          }
          if (type === 'to') {
            route.to = pointTo;
          }
          route.name = `Маршрут из ${route.from.name} в ${route.to.name}`;
        }

        return route;
      });

      const activeRoute = state.routes.find((route) => route?.id === Number(routeId));
      state.activeRouteData = activeRoute;
      state.routes = updatedRoutes;
    },
    setActiveRoute: (state, action: PayloadAction<number>) => {
      state.activeRouteId = action.payload;
      const activeRoute = state.routes.find((route) => route?.id === Number(action.payload));
      state.activeRouteData = activeRoute;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setPolyline: (state, action: PayloadAction<number[][]>) => {
      state.activeRouteData.polyline = action.payload;
    },
  },
});

export const {
  setPoints,
  setRoutes,
  updateRoutes,
  setActiveRoute,
  setIsFetching,
  setPolyline,
} = pointsSlice.actions;

export default pointsSlice.reducer;
