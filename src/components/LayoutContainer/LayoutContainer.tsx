import React, { useState, useEffect } from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import './LayoutContainerStyles.scss';
import Map from '../Map/Map';
import Resizer from '../Resizer/Resizer';
import transformRoutes from '../../app/helpers/transformRoutes';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setActiveRouteData, setActiveRouteId, updateRoutes } from '../../app/slices/pointsReducer';
import { Point, Route } from '../../app/interfaces/store-interfaces';
import deliveryLogo from '../../app/images/delivery_logo.svg';

const {
  Header, Content, Sider,
} = Layout;

const LayoutContainer = () => {
  const [width, setWidth] = useState<number>(400);
  const [routesList, setRoutesList] = useState<Route[]>([]);
  const [pointsList, setPointsList] = useState<Point[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const pageMiddle = Math.round(window.innerWidth / 2);
  const minWidth = 200;

  const dispatch = useAppDispatch();

  const routesData = useAppSelector((state) => state.points.routes);
  const pointsData = useAppSelector((state) => state.points.points);
  const activeRouteId = useAppSelector((state) => state.points.activeRouteId);
  const activeRouteData = useAppSelector((state) => state.points.activeRouteData);
  const isFetching = useAppSelector((state) => state.points.isFetching);

  const handleChange = (type: string) => (_: any, opt: { key: number}): void => {
    const choiceIndex = opt?.key;
    const target = pointsData.find((p) => Number(p.id) === Number(choiceIndex));

    const data: Route = { ...activeRouteData! };

    const updatedRoutes = routesData.map((route) => {
      const updatedRoute = { ...route };

      if (Number(updatedRoute?.id) === Number(activeRouteId)) {
        if (type === 'from') {
          updatedRoute.from = target!;
          data.from = target!;
        }
        if (type === 'to') {
          updatedRoute.to = target!;
          data.to = target!;
        }
        updatedRoute.name = `Маршрут из ${updatedRoute.from.name} в ${updatedRoute.to.name}`;
        data.name = `Маршрут из ${data.from.name} в ${data.to.name}`;
      }

      return updatedRoute;
    });

    dispatch(updateRoutes(updatedRoutes));
    dispatch(setActiveRouteData(data));
  };

  const items = transformRoutes(routesList, pointsList, handleChange('from'), handleChange('to'));

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

  const handleMenuClick = (e: any) => {
    dispatch(setActiveRouteId(e.key));
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
