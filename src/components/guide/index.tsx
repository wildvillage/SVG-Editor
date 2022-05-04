import React from 'react';
import { Typography, Divider } from 'antd';
import styles from './index.module.less';
import step1 from '../../assets/step1.gif';
import step2 from '../../assets/step2.gif';
import step3 from '../../assets/step3.gif';
import step4 from '../../assets/step4.gif';

const { Title } = Typography;

function Guide() {
  return (
    <div className={styles.guid}>
      <Title level={5}>第一步：使用工具栏</Title>
      <img src={step1} alt="step1" className={styles['guid-img']} />
      <Divider />
      <Title level={5}>第二步：创建图形</Title>
      <img src={step2} alt="step1" className={styles['guid-img']} />
      <Divider />
      <Title level={5}>第三步：编辑图形</Title>
      <img src={step3} alt="step1" className={styles['guid-img']} />
      <Divider />
      <Title level={5}>第四步：查看代码</Title>
      <img src={step4} alt="step1" className={styles['guid-img']} />
    </div>
  );
}

export default Guide;
