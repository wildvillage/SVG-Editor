import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'ahooks';
import { Divider, Tooltip } from 'antd';
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
  const rect = useRef(null);

  useDrag('line', line, {
    onDragStart: () => {},
  });

  useDrag('rect', rect, {
    onDragStart: () => {},
  });

  return (
    <div className={styles.tool}>
      <Tooltip title="直线" placement="top">
        <ArrowRightOutlined {...iconProps} ref={line} />
      </Tooltip>
      <Divider type="vertical"></Divider>
      <Tooltip title="矩形" placement="top">
        <BorderOutlined {...iconProps} ref={rect} />
      </Tooltip>
      <Divider type="vertical"></Divider>
      <Tooltip title="点击显隐网格线" placement="top">
        <NumberOutlined
          {...iconProps}
          onClick={() => dispatch(toggleSplitLine())}
        />
      </Tooltip>
    </div>
  );
};

export default Tool;
