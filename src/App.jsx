import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import LayoutContainer from './components/LayoutContainer/LayoutContainer';
import { setPoints } from './app/slices/pointsReducer';
import './App.scss';
import 'antd/dist/antd.min.css';

const coords = [
  {
    id: 0, name: 'Точка 1', lat: 55.815012, lng: 37.519520,
  },
  {
    id: 1, name: 'Точка 2', lat: 55.755966, lng: 37.591280,
  },
  {
    id: 2, name: 'Точка 3', lat: 55.681831, lng: 37.455593,
  },
  {
    id: 3, name: 'Точка 4', lat: 55.606520, lng: 37.655083,
  },
  {
    id: 4, name: 'Точка 5', lat: 55.627515, lng: 37.309788,
  },
  {
    id: 5, name: 'Точка 6', lat: 55.768282, lng: 37.382783,
  },
];

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPoints(coords));
  }, []);

  return (
    <div className="App">
      <LayoutContainer />
    </div>
  );
}

export default App;
