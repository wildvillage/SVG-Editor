import React, { useMemo, useState } from 'react';
import cls from 'classnames';
import { nanoid } from 'nanoid';
import { Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import DashBoard from '../dashboard';
import { generateScaleLines } from './utils';
import { SVG_XMLNS, SCALE_STEP } from '../../index';
import Tool from '../tool';
import styles from './index.module.less';
import 'animate.css';
import Move from '../../components/moveWapper';

const Header: React.FC = () => {
  const [showTool, setShowTool] = useState<boolean>(false);
  const [showStore, setShowStore] = useState<boolean>(false);

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
      {/* 画布 */}
      <Move render={<Tool />} />
      <DashBoard />
      {/* 左侧工具栏 */}
      <Tooltip title="工具栏">
        <div
          className={styles.tool}
          onClick={() => setShowTool(!showTool)}></div>
      </Tooltip>
      {showTool && (
        <div
          className={cls(styles.toolContainer, 'animate__animated', {
            animate__fadeInLeft: showTool,
          })}>
          <Move render={<Tool />} />
        </div>
      )}
      {/* 右侧选项栏 */}
      <Tooltip title="选项栏" placement="rightTop">
        <div
          className={styles.store}
          onClick={() => setShowStore(!showStore)}></div>
      </Tooltip>
      {showStore && (
        <div
          className={cls(styles.ShoreContainer, 'animate__animated', {
            animate__fadeInRight: showStore,
          })}>
        </div>
      )}
    </div>
  );
};

export default Header;
