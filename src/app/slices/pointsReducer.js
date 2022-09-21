import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  points: [],
  routes: [],
  activeRouteId: null,
  activeRouteData: {},
  isFetching: false,
};

export const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setRoutes: (state, action) => {
      state.routes = action.payload;
    },
    updateRoutes: (state, action) => {
      const { routes } = state;
      const {
        type, routeId, pointFrom, pointTo,
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
    setActiveRoute: (state, action) => {
      state.activeRouteId = action.payload;
      const activeRoute = state.routes.find((route) => route?.id === Number(action.payload));
      state.activeRouteData = activeRoute;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setPolyline: (state, action) => {
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
