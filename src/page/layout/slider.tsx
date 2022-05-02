import React from 'react';
import styles from './index.module.less';
import { ExpandOutlined } from '@ant-design/icons';
import Guid from '../../components/guide';
import { setting } from '../../settings/action';
import { InputNumber, Form } from 'antd';
import logo from '../../assets/logo.png';
import Guide from '../../components/guide';

type PropKey = 'default' | 'geometric' | 'notGeometric';
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
      key: 'geometric',
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
        <span className={styles.title}>
          <img className={styles['logo-img']} src={logo} />
        </span>
      </div>
      <div className={styles['action-area']}>
        {currentSetting &&
          actions.map((item, i) => {
            const props = currentSetting[item.key as PropKey];
            const keys = Object.keys(props);
            return (
              <div key={i} className={styles.card}>
                <Form
                  name={item.key}
                  size="small"
                  labelCol={{ span: 8, offset: 0 }}
                  colon={false}
                >
                  {keys.map((key) => {
                    return (
                      <Form.Item
                        key={key}
                        label={<div className={styles.label}>{key}</div>}
                      >
                        <InputNumber></InputNumber>
                      </Form.Item>
                    );
                  })}
                </Form>
              </div>
            );
          })}
        {/* 操作导航 */}
        {!currentSetting && <Guide />}
      </div>
    </div>
  );
};

export default Slider;
