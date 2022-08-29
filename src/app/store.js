import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import pointsReducer from './slices/pointsReducer';
import pointsSaga from './sagas/pointsSaga';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    points: pointsReducer,
  },
  middleware: [saga],
});

saga.run(pointsSaga);

export default store;
