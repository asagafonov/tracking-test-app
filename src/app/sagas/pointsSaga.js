import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import { setPolyline, setIsFetching } from '../slices/pointsReducer';

const mapboxToken = 'pk.eyJ1IjoiYXNhZ2Fmb25vdiIsImEiOiJjbDdldHpxemUwM3dyM29xd3g2MmxmcDlsIn0.BYHHfMSflFi0MTGDa8CBbg';

const activeRouteState = (state) => state.points.activeRouteData;

function* fetchPolyline() {
  yield put(setIsFetching(true));

  const activeRouteData = yield select(activeRouteState);
  const { from, to } = activeRouteData;

  const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${from.lng}%2C${from.lat}%3B${to.lng}%2C${to.lat}?geometries=geojson&access_token=${mapboxToken}`;

  try {
    const polylineData = yield call(() => fetch(apiUrl));
    const polyline = yield polylineData.json();

    const coords = polyline?.routes?.[0]?.geometry?.coordinates;
    const reversed = coords.map(([lng, lat]) => [lat, lng]);
    yield put(setPolyline(reversed));
    yield put(setIsFetching(false));
  } catch {
    console.error('Error: couldn\'t fetch polyline for given coordinates');
    yield put(setIsFetching(false));
  }
}

function* pointsSaga() {
  yield takeLatest('points/setActiveRoute', fetchPolyline);
  yield takeLatest('points/updateRoutes', fetchPolyline);
}

export default pointsSaga;
