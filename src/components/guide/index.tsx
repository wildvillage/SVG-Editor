import React from 'react';
import { Typography, Divider } from 'antd';
import styles from './index.module.less';
import step1 from '../../assets/step1.gif';

const { Title } = Typography;

function Guide() {
  return (
    <div className={styles.guid}>
      <Title level={5}>第一步：使用工具栏</Title>
      <img src={step1} alt="step1" className={styles['guid-img']} />
      <Divider />
      <Title level={5}>第二步：创建图形</Title>
      <Divider />
      <Title level={5}>第三步：编辑图形</Title>
      <Divider />
      <Title level={5}>第四步：查看代码</Title>
    </div>
  );
}

export default Guide;
