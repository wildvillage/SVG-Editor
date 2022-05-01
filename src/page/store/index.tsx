import React from 'react';
import styles from './index.module.less';
import { ExpandOutlined, LineOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

const Store: React.FC = () => {
  return (
    <div className={styles.store}>
      <ExpandOutlined />
      <Divider type="vertical" />
      <LineOutlined />
    </div>
  );
};

export default Store;
