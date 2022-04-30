import React from 'react';
import styles from './index.module.less';
import { Button } from 'antd';
import { CodeOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Button icon={<CodeOutlined />}>Code</Button>
    </div>
  );
};

export default Header;
