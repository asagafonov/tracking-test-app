import React, { useState, useEffect } from 'react';
import { NodeIndexOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import cn from 'classnames';

import './LayoutContainerStyles.scss';

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

const items = [
  getItem('Option 1aldkjf;lakjdf;lkjads;lfkj;alkdsjf;laksjdf;lkajsd;flkja;ldskfjs;l', '1', <NodeIndexOutlined />),
  getItem('Option 2', '2', <NodeIndexOutlined />),
  getItem('User', 'sub1', <NodeIndexOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <NodeIndexOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <NodeIndexOutlined />),
];

const LayoutContainer = () => {
  const [width, setWidth] = useState(400);
  const pageMiddle = Math.round(window.innerWidth / 2);
  const minWidth = 200;

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
          <Menu theme="dark" mode="inline" items={items} />
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
