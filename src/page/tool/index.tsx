import React from 'react';
import styles from './index.module.less';
import { Divider } from 'antd';
import {
  ArrowRightOutlined,
  BorderOutlined,
  NumberOutlined,
} from '@ant-design/icons';

const iconProps = {
  style: { fontSize: '20px', color: '#999' },
  className: 'hover',
};

const Tool: React.FC = () => {
  return (
    <div className={styles.tool}>
      <ArrowRightOutlined {...iconProps} />
      <Divider type="vertical"></Divider>
      <BorderOutlined {...iconProps} />
      <Divider type="vertical"></Divider>
      <NumberOutlined {...iconProps} />
    </div>
  );
};

export default Tool;
