import React from 'react';
import styles from './index.module.less';
import { Divider } from 'antd';
import {
  ArrowRightOutlined,
  BorderOutlined,
  MenuOutlined,
} from '@ant-design/icons';

const Tool: React.FC = () => {
  return (
    <div className={styles.tool}>
      <ArrowRightOutlined
        style={{ fontSize: '20px', color: '#999' }}
        className="hover"
      />
      <Divider type="vertical"></Divider>
      <BorderOutlined
        style={{ fontSize: '20px', color: '#999' }}
        className="hover"
      />
      <Divider type="vertical"></Divider>
      <MenuOutlined
        style={{ fontSize: '20px', color: '#999' }}
        className="hover"
      />
    </div>
  );
};

export default Tool;
