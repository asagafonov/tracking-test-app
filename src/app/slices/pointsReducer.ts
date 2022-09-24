import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Point,
  Route,
} from '../interfaces/store-interfaces';

interface PointsState {
  points: Array<Point>;
  routes: Array<Route>;
  activeRouteId: number;
  activeRouteData: Route | null;
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
    updateRoutes: (state, action: PayloadAction<Route[]>) => {
      state.routes = action.payload;
    },
    setActiveRouteId: (state, action: PayloadAction<number>) => {
      state.activeRouteId = action.payload;
    },
    setActiveRouteData: (state, action: PayloadAction<Route>) => {
      state.activeRouteData = action.payload;
    },
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
    setPolyline: (state, action: PayloadAction<number[][]>) => {
      if (state.activeRouteData) {
        state.activeRouteData.polyline = action.payload;
      }
    },
  },
});

export const {
  setPoints,
  setRoutes,
  updateRoutes,
  setActiveRouteId,
  setActiveRouteData,
  setIsFetching,
  setPolyline,
} = pointsSlice.actions;

export default pointsSlice.reducer;
