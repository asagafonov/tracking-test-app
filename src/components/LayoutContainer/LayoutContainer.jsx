import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NodeIndexOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import { Layout, Menu, Select } from 'antd';
import cn from 'classnames';

import './LayoutContainerStyles.scss';
import Map from '../Map/Map';
import { setActiveRoute, updateRoutes } from '../../app/slices/pointsReducer';
import deliveryLogo from '../../app/images/delivery_logo.svg';

const {
  Header, Content, Sider,
} = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const transformRoutes = (routesList, pointsList, changeFrom, changeTo) => routesList
  .map((el) => getItem(
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
          onChange={changeFrom}
        >
          {
            pointsList.map((listEl) => (
              <Select.Option value={listEl.name} key={listEl.id} />
            ))
          }
        </Select>
        <Select
          defaultValue={routesList[el?.id]?.to?.name}
          onChange={changeTo}
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
  const [routesList, setRoutesList] = useState([]);
  const [pointsList, setPointsList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const pageMiddle = Math.round(window.innerWidth / 2);
  const minWidth = 200;

  const dispatch = useDispatch();

  const routesData = useSelector((state) => state.points.routes);
  const pointsData = useSelector((state) => state.points.points);
  const activeId = useSelector((state) => state.points.activeRouteId);
  const activeRouteData = useSelector((state) => state.points.activeRouteData);
  const isFetching = useSelector((state) => state.points.isFetching);

  const changeFrom = (val, opt) => {
    const choiceIndex = Number(opt?.key);
    const target = pointsData.find((p) => p.id === choiceIndex);
    dispatch(updateRoutes({ type: 'from', routeId: activeId, pointFrom: target }));
  };

  const changeTo = (val, opt) => {
    const choiceIndex = Number(opt?.key);
    const target = pointsData.find((p) => p.id === choiceIndex);
    dispatch(updateRoutes({ type: 'to', routeId: activeId, pointTo: target }));
  };

  const items = transformRoutes(routesList, pointsList, changeFrom, changeTo);

  useEffect(() => {
    if (!isFetching && activeRouteData?.polyline) {
      setIsUpdating(true);
    } else {
      setTimeout(() => {
        setIsUpdating(false);
      }, 1200);
    }
  }, [isFetching]);

  useEffect(() => {
    setRoutesList(routesData);
  }, [routesData]);

  useEffect(() => {
    setPointsList(pointsData);
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
        >
          <div className="logo__wrapper">
            <img
              src={deliveryLogo}
              className="logo"
              alt=""
            />
            {
              isUpdating && (
                <Loading3QuartersOutlined
                  spin
                  style={{
                    color: '#fff',
                    marginRight: '30px',
                  }}
                />
              )
            }
          </div>
        </Header>
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
            <Map />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutContainer;
