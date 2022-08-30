import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import LayoutContainer from './components/LayoutContainer/LayoutContainer';
import { setPoints } from './app/slices/pointsReducer';
import useResize from './app/helpers/useResize';
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
  {
    id: 6, name: 'Точка 7', lat: 55.905438, lng: 37.710340,
  },
  {
    id: 7, name: 'Точка 8', lat: 55.902811, lng: 37.413206,
  },
  {
    id: 8, name: 'Точка 9', lat: 55.555246, lng: 37.724291,
  },
  {
    id: 9, name: 'Точка 10', lat: 55.648847, lng: 37.538069,
  },
];

function App() {
  const [isMobile, setisMobile] = useState(false);

  const breakpoint = useResize();

  useEffect(() => {
    if (breakpoint < 768) {
      setisMobile(true);
    } else {
      setisMobile(false);
    }
  }, [breakpoint]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPoints(coords));
  }, []);

  return (
    <div className="App">
      {!isMobile && <LayoutContainer />}
      {isMobile && <div className="mobile-placeholder"><p>Мобильная версия недоступна</p></div>}
    </div>
  );
}

export default App;
