import { createSlice } from '@reduxjs/toolkit';
import { chunk } from 'lodash';

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
      const chunks = chunk(action.payload, 2).filter((el) => el?.length === 2);
      state.routes = chunks.map(([from, to], ind) => ({
        id: ind,
        name: `Маршрут из ${from.name} в ${to.name}`,
        from,
        to,
      }));
    },
    updateRoutes: (state, action) => {
      const { routes } = state;
      const { routeId, pointFrom, pointTo } = action.payload;

      state.routes = routes.map((route) => {
        if (route?.id === routeId) {
          route.from = pointFrom;
          route.to = pointTo;
        }
        return route;
      });
    },
    setActiveRoute: (state, action) => {
      state.activeRouteId = action.payload;
      const activeRoute = state.routes.find((route) => route?.id === Number(action.payload));
      state.activeRouteData = activeRoute;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const {
  setPoints,
  updateRoutes,
  setActiveRoute,
  setIsFetching,
} = pointsSlice.actions;

export default pointsSlice.reducer;
