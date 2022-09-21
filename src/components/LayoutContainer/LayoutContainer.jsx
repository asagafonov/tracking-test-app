import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import './LayoutContainerStyles.scss';
import Map from '../Map/Map';
import Resizer from '../Resizer/Resizer';
import transformRoutes from '../../app/helpers/transformRoutes';
import { setActiveRoute, updateRoutes } from '../../app/slices/pointsReducer';
import deliveryLogo from '../../app/images/delivery_logo.svg';

const {
  Header, Content, Sider,
} = Layout;

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

  const handleMenuClick = (e) => {
    dispatch(setActiveRoute(e.key));
  };

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
            style={{ minWidth: width }}
            onClick={handleMenuClick}
          />
        </Sider>
        <p
          className="sider__link"
        >
          coded by
          {' '}
          <a href="https://asagafonov.com">
            asagafonov
          </a>
        </p>
      </div>
      <Resizer
        minWidth={minWidth}
        pageMiddle={pageMiddle}
        width={width}
        setWidth={setWidth}
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
            <Map overlayWidth={width} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutContainer;
