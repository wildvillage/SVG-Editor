import React from 'react';
import styles from './index.module.less';
import { Divider } from 'antd';
import {
  ArrowRightOutlined,
  Loading3QuartersOutlined,
} from '@ant-design/icons';

const Tool: React.FC = () => {
  return (
    <div className={styles.tool}>
      <ArrowRightOutlined style={{ fontSize: '20px', color: '#999' }} />
      <Divider type="vertical"></Divider>
      <Loading3QuartersOutlined style={{ fontSize: '20px', color: '#999' }} />
    </div>
  );
};

export default Tool;
