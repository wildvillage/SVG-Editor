import React from 'react';
import { useDispatch } from 'react-redux';
import { Divider } from 'antd';
import {
  ArrowRightOutlined,
  BorderOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { toggleSplitLine } from '../../store/tool';
import styles from './index.module.less';

const iconProps = {
  style: { fontSize: '20px', color: '#999' },
  className: 'hover',
};

const Tool: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.tool}>
      <ArrowRightOutlined {...iconProps} />
      <Divider type="vertical"></Divider>
      <BorderOutlined {...iconProps} />
      <Divider type="vertical"></Divider>
      <NumberOutlined
        {...iconProps}
        onClick={() => dispatch(toggleSplitLine())}
      />
    </div>
  );
};

export default Tool;
