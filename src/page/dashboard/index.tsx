import { useRef, useMemo } from 'react';
import { useDashboardSize } from '../../utils';
import { generateSplitLine } from '../layout/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SVG_XMLNS, SCALE_STEP } from '../../index';
import styles from './index.module.less';
import { nanoid } from '@reduxjs/toolkit';

function Dashboard() {
  const dashboard = useRef<HTMLDivElement>(null);
  useDashboardSize(dashboard);

  const showSplitLine = useSelector(
    (state: RootState) => state.tool.showSplitLine
  );

  return (
    <div className={styles.dashboard} ref={dashboard}>
      {/* 网格线 */}
      {showSplitLine && (
        <SplitLine
          width={dashboard.current?.offsetWidth as number}
          height={dashboard.current?.offsetHeight as number}
        />
      )}
      <svg xmlns={SVG_XMLNS}></svg>
    </div>
  );
}

function SplitLine({ width, height }: { width: number; height: number }) {
  const splitLine = useMemo(() => {
    if (height && width) {
      const vertical = Math.ceil(width / 100);
      const verticalLine = generateSplitLine(
        vertical * 5,
        SCALE_STEP,
        'vertical'
      );

      const horizontal = Math.ceil(height / 100);
      const horizontalLine = generateSplitLine(
        horizontal * 5,
        SCALE_STEP,
        'horizontal'
      );
      return [...verticalLine, ...horizontalLine];
    }
  }, [height, width]);

  return (
    <svg xmlns={SVG_XMLNS} className={styles.splitLine}>
      {splitLine?.map((line) => (
        <line key={nanoid()} {...line} />
      ))}
    </svg>
  );
}

export default Dashboard;
