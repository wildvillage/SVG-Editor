import { useDispatch } from 'react-redux';
import React, { useRef } from 'react';
import { Divider } from 'antd';
import { useDrag } from 'ahooks';
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

  const line = useRef(null);
  useDrag('line', line, {
    onDragStart: () => {
      console.log('开始拖动');
    },
  });
  return (
    <div className={styles.tool}>
      <ArrowRightOutlined {...iconProps} ref={line} />
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
