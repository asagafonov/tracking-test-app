import { configureStore } from '@reduxjs/toolkit';

const counterReducer = '';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
