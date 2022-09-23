import React from 'react';
import { Select } from 'antd';

import { NodeIndexOutlined } from '@ant-design/icons';
import { Point, Route } from '../interfaces/store-interfaces';

const getItem = (
  key,
  icon,
  children,
) => ({
  key,
  icon,
  children,
});

const transformRoutes = (
  routesList: Route[],
  pointsList: Point[],
  changeFrom,
  changeTo,
) => routesList
  .map((el) => getItem(
    (
      <div
        className="menu__item"
      >
        <Select
          defaultValue={routesList[el?.id]?.from?.name}
          onChange={changeFrom}
        >
          {
            pointsList
              .filter((point) => point.id !== routesList[el.id].to.id)
              .map((listEl) => (
                <Select.Option value={listEl.name} key={listEl.id} />
              ))
          }
        </Select>
        <Select
          defaultValue={routesList[el?.id]?.to?.name}
          onChange={changeTo}
        >
          {
            pointsList
              .filter((point) => point.id !== routesList[el.id].from.id)
              .map((listEl) => (
                <Select.Option value={listEl.name} key={listEl.id} />
              ))
          }
        </Select>
      </div>
    ),
    el?.id,
    <NodeIndexOutlined />,
  ));

export default transformRoutes;
