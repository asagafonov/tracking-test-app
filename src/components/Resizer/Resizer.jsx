import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import './ResizerStyles.scss';
import twoArrows from '../../app/images/two-arrows.png';

const Resizer = ({
  minWidth,
  pageMiddle,
  width,
  setWidth,
}) => {
  const resize = (e) => {
    const newWidth = e.pageX;

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
    window.removeEventListener('mousemove', resize);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
  };

  const resizerStyle = cn('resizer', {
    resizer__cursor: width < pageMiddle && width > minWidth,
    resizer__cursor_left: width >= pageMiddle,
    resizer__cursor_right: width <= minWidth,
  });

  return (
    <div
      className={resizerStyle}
      onMouseDown={handleMouseDown}
    >
      <div
        className="resizer__circle"
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
