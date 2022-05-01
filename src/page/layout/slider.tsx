import React from 'react';
import styles from './index.module.less';
import { ExpandOutlined } from '@ant-design/icons';
import { setting } from '../../settings/action';
import { InputNumber } from 'antd';
import { render } from 'react-dom';

const current = 'circle';

const Slider: React.FC = () => {
  const currentSetting = setting[current];

  const actions = [
    {
      title: '几何位置',
      key: 'default',
    },
    {
      title: 'svg属性',
      key: 'props',
    },
    {
      title: '非几何属性',
      key: 'notGeometric',
    },
  ];

  return (
    <div className={styles.slider}>
      <div className={styles.logo}>
        <ExpandOutlined style={{ fontSize: '20px' }} />
        <span className={styles.title}>svg editor</span>
      </div>
      <div className={styles['action-area']}>
        {actions.map((item, i) => {
          return <div key={i} className={styles.card}></div>;
        })}
      </div>
    </div>
  );
};

export default Slider;
