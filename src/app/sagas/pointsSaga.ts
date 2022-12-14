import {
  call, put, SagaReturnType, select, takeLatest,
} from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { chunk } from 'lodash';

import { RootState } from '../store';
import {
  setPolyline,
  setIsFetching,
  setRoutes,
  setActiveRouteData,
} from '../slices/pointsReducer';
import { Route } from '../interfaces/store-interfaces';
import { Polyline } from '../interfaces/api-interfaces';

const mapboxToken = 'pk.eyJ1IjoiYXNhZ2Fmb25vdiIsImEiOiJjbDdldHpxemUwM3dyM29xd3g2MmxmcDlsIn0.BYHHfMSflFi0MTGDa8CBbg';

const routesState = (state: RootState) => state.points.routes;
const activeRouteState = (state: RootState) => state.points.activeRouteData;
const pointsState = (state: RootState) => state.points.points;

function* fetchPolyline() {
  yield put(setIsFetching(true));

  const activeRouteData: ReturnType<typeof activeRouteState> = yield select(activeRouteState);
  const { from, to } = activeRouteData!;

  const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${from.lng}%2C${from.lat}%3B${to.lng}%2C${to.lat}?geometries=geojson&access_token=${mapboxToken}`;

  try {
    const polylineData: SagaReturnType<typeof fetch> = yield call(() => fetch(apiUrl));
    const polyline: Polyline = yield polylineData.json();

    const coords = polyline?.routes?.[0]?.geometry?.coordinates;
    const reversed = coords.map(([lng, lat]: number[]) => [lat, lng]);
    yield put(setPolyline(reversed));
    yield put(setIsFetching(false));
  } catch {
    console.error('Error: couldn\'t fetch polyline for given coordinates');
    yield put(setIsFetching(false));
  }
}

function* chunkRoutes() {
  const points: ReturnType<typeof pointsState> = yield select(pointsState);

  try {
    const chunks = chunk(points, 2).filter((el) => el?.length === 2);
    const routes = chunks.map(([from, to], ind) => ({
      id: ind,
      name: `Маршрут из ${from.name} в ${to.name}`,
      from,
      to,
    }));

    yield put(setRoutes(routes));
  } catch {
    console.error('Error: couldn\'t chunk points');
  }
}

function* onActiveRouteChange(action: PayloadAction<number>) {
  try {
    const routes: ReturnType<typeof routesState> = yield select(routesState);

    const activeRoute: Route | null = routes
      .find((route) => route?.id === Number(action.payload)) || null;

    if (activeRoute) {
      yield put(setActiveRouteData(activeRoute));
    } else {
      throw new Error('No active route found');
    }
  } catch (e: any) {
    console.error(e.message);
  }
}

function* pointsSaga() {
  yield takeLatest('points/setPoints', chunkRoutes);
  yield takeLatest('points/setActiveRouteId', onActiveRouteChange);
  yield takeLatest(['points/setActiveRouteId', 'points/updateRoutes'], fetchPolyline);
}

export default pointsSaga;
