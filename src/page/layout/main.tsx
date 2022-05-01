import React, { useMemo } from 'react';
import cls from 'classnames';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import DashBoard from '../dashboard';
import { generateScaleLines } from './utils';
import { SVG_XMLNS, SCALE_STEP } from '../../index';
import styles from './index.module.less';
import Tool from '../tool';

const Header: React.FC = () => {
  const size = useSelector((state: RootState) => state.position.size);

  const scales = useMemo(() => {
    const { height, width } = size;

    if (height && width) {
      const lineTop = Math.ceil(width / 100);
      const scaleTopLine = generateScaleLines(lineTop * 5, SCALE_STEP, 'top');

      const lineLeft = Math.ceil(height / 100);
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
      <DashBoard />
    </div>
  );
};

export default Header;
