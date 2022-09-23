import React, { useState } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import './ResizerStyles.scss';
import twoArrows from '../../app/images/two-arrows.png';

const Resizer = ({
  minWidth,
  pageMiddle,
  width,
  setWidth,
}: {
  minWidth: number;
  pageMiddle: number;
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isResizing, setIsResizing] = useState(false);

  const resize = (e: MouseEvent) => {
    setIsResizing(true);
    const resizerWidth = 18;
    const newWidth = e.pageX - resizerWidth;

    setWidth(() => {
      if (newWidth > pageMiddle) {
        return pageMiddle;
      }
      if (newWidth <= minWidth) {
        return minWidth;
      }
      return newWidth;
    });
  };

  const stopResize = () => {
    setIsResizing(false);
    window.removeEventListener('mousemove', resize);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
  };

  const resizerStyle = cn('resizer', {
    resizer__cursor: width < pageMiddle && width > minWidth,
    resizer__cursor_left: width >= pageMiddle,
    resizer__cursor_right: width <= minWidth,
  });

  const resizerCircleStyle = cn('resizer__circle', {
    resizer__circle_active: isResizing,
  });

  return (
    <div
      className={resizerStyle}
      onMouseDown={handleMouseDown}
    >
      <div
        className={resizerCircleStyle}
      >
        <img
          className="resizer__circle_icon"
          src={twoArrows}
          alt=""
        />
      </div>
    </div>
  );
};

Resizer.propTypes = {
  minWidth: PropTypes.number,
  pageMiddle: PropTypes.number,
  width: PropTypes.number,
  setWidth: PropTypes.func,
};

export default Resizer;
