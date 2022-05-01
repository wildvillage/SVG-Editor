import React from 'react';
import styles from './index.module.less';
import Store from '../store';

const Header: React.FC = () => {
  return (
    <div className={styles.main}>
      <Store></Store>
    </div>
  );
};

export default Header;
