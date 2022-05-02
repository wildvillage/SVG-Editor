import React, { useMemo, useState } from 'react';
import cls from 'classnames';
import { nanoid } from 'nanoid';
import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import DashBoard from '../dashboard';
import { generateScaleLines } from './utils';
import { SVG_XMLNS, SCALE_STEP } from '../../index';
import Move from '../../components/moveWapper';
import Tool from '../tool';
import styles from './index.module.less';
import 'animate.css';

const Header: React.FC = () => {
  const [showTool, setShowTool] = useState<boolean>(true);

  const size = useSelector((state: RootState) => state.position.size);

  const scales = useMemo(() => {
    const { height, width } = size;

    if (height && width) {
      const SPACING: number = 100;
      const lineTop = Math.ceil(width / SPACING);
      const scaleTopLine = generateScaleLines(lineTop * 5, SCALE_STEP, 'top');

      const lineLeft = Math.ceil(height / SPACING);
      const scaleLeftLine = generateScaleLines(
        lineLeft * 5,
        SCALE_STEP,
        'left'
      );

      return {
        top: scaleTopLine,
        left: scaleLeftLine,
      };
    }
  }, [size]);

  return (
    <div className={styles.main}>
      {/* 刻度尺 */}
      <div className={cls(styles.scale, styles.scaleTop)}>
        <svg xmlns={SVG_XMLNS}>
          {scales?.top?.map((line) => (
            <line key={nanoid()} {...line} />
          ))}
        </svg>
      </div>
      <div className={cls(styles.scale, styles.scaleLeft)}>
        <svg xmlns={SVG_XMLNS}>
          {scales?.left?.map((line) => (
            <line key={nanoid()} {...line} />
          ))}
        </svg>
      </div>
      {/* 左侧工具栏 */}
      <Tooltip title="工具栏">
        <div
          className={styles.tool}
          onClick={() => setShowTool(!showTool)}
        ></div>
      </Tooltip>
      {showTool && <Move render={<Tool />} />}
      {/* 画布 */}
      <DashBoard />
    </div>
  );
};

export default Header;
