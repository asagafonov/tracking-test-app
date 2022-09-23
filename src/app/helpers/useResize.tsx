import { useState, useEffect } from 'react';

const useResize = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const getWidth = () => setWidth(window.innerWidth);
    getWidth();
    window.addEventListener('resize', getWidth);
    return () => window.removeEventListener('resize', getWidth);
  }, []);

  return width;
};

export default useResize;
