import React, { Fragment } from 'react';
import { Typography, Divider } from 'antd';
import styles from './index.module.less';
import step1 from '../../assets/step1.gif';
import step2 from '../../assets/step2.gif';
import step3 from '../../assets/step3.gif';
import step4 from '../../assets/step4.gif';

const { Title } = Typography;

const GUIDES = [
  {
    title: '第一步：使用工具栏',
    guideImg: step1,
  },
  {
    title: '第二步：创建图形',
    guideImg: step2,
  },
  {
    title: '第三步：编辑图形',
    guideImg: step3,
  },
  {
    title: '第四步：查看代码',
    guideImg: step4,
  },
] as const;

function Guide() {
  return (
    <div className={styles.guid}>
      {GUIDES.map((guide, idx) => (
        <Fragment key={idx}>
          <Title level={5}>{guide.title}</Title>
          <img
            src={guide.guideImg}
            alt={guide.title}
            className={styles['guid-img']}
          />
          <Divider />
        </Fragment>
      ))}
    </div>
  );
}

export default Guide;
