import { configureStore } from '@reduxjs/toolkit';
import pointsReducer from './slices/pointsReducer';

const store = configureStore({
  reducer: {
    points: pointsReducer,
  },
});

export default store;
