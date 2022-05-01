import React from 'react';
import styles from './index.module.less';
import Tool from '../tool';

const Header: React.FC = () => {
  return (
    <div className={styles.main}>
      <Tool></Tool>
    </div>
  );
};

export default Header;
