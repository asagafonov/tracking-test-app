import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NodeIndexOutlined } from '@ant-design/icons';
import { Layout, Menu, Select } from 'antd';
import cn from 'classnames';

import './LayoutContainerStyles.scss';
import { setActiveRoute } from '../app/slices/pointsReducer';

const {
  Header, Content, Footer, Sider,
} = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const transformRoutes = (routesList, pointsList) => routesList.map((el) => getItem(
  (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <Select
        defaultValue={routesList[el?.id]?.from?.name}
      >
        {
          pointsList.map((listEl) => (
            <Select.Option value={listEl.name} key={listEl.id} />
          ))
        }
      </Select>
      <Select
        defaultValue={routesList[el?.id]?.to?.name}
      >
        {
          pointsList.map((listEl) => (
            <Select.Option value={listEl.name} key={listEl.id} />
          ))
        }
      </Select>
    </div>
  ),
  el?.id,
  <NodeIndexOutlined />,
));

const LayoutContainer = () => {
  const [width, setWidth] = useState(400);
  const [routes, setRoutes] = useState([]);
  const [points, setPoints] = useState([]);
  const pageMiddle = Math.round(window.innerWidth / 2);
  const minWidth = 200;

  const dispatch = useDispatch();
  const routesData = useSelector((state) => state.points.routes);
  const pointsData = useSelector((state) => state.points.points);
  const items = transformRoutes(routes, points);

  useEffect(() => {
    setRoutes(routesData);
  }, [routesData]);

  useEffect(() => {
    setPoints(pointsData);
  }, [pointsData]);

  useEffect(() => {
    const preventDragover = (e) => e.preventDefault();

    document.addEventListener('dragover', preventDragover, false);
    return () => document.removeEventListener('dragover', preventDragover, false);
  }, []);

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = (e) => {
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

  const handleMenuClick = (e) => {
    dispatch(setActiveRoute(e.key));
  };

  const resizerStyle = cn('resizer', {
    resizer__cursor: width < pageMiddle && width > minWidth,
    resizer__cursor_left: width >= pageMiddle,
    resizer__cursor_right: width <= minWidth,
  });

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <div
        style={{ width: `${width}px` }}
        className="sider__wrapper"
      >
        <Sider width="100%">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            style={{ minWidth: '400px', overflow: 'scroll' }}
            onClick={handleMenuClick}
          />
        </Sider>
      </div>
      <div
        draggable
        className={resizerStyle}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            Map content here
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          coded by asagafonov
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutContainer;
