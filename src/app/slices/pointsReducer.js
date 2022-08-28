import { createSlice } from '@reduxjs/toolkit';
import { chunk } from 'lodash';

const initialState = {
  points: [],
  routes: [],
  activeRouteId: null,
  activeRouteData: {},
  isFetching: false,
};

// const route = {
//   id: 0,
//   from: {
//     id: 23,
//     name: 'Адрес1',
//     lat: 12345,
//     lng: 12345,
//   },
//   to: {
//     id: 4,
//     name: 'Адрес2',
//     lat: 2234,
//     lng: 88565,
//   },
// };

export const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    composeRoutes: (state) => {
      const chunks = chunk(state.points, 2).filter((el) => el?.length === 2);
      state.routes = chunks.map(([from, to], ind) => ({ id: ind, from, to }));
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
      const activeRoute = state.routes.find((route) => route?.id === action.payload);
      state.activeRouteData = activeRoute;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const {
  setPoints,
  composeRoutes,
  updateRoutes,
  setActiveRoute,
  setIsFetching,
} = pointsSlice.actions;

export default pointsSlice.reducer;
