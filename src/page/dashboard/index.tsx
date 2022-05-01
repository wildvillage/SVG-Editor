import { useRef, useMemo, RefObject } from 'react';
import { useDashboardSize } from '../../utils';
import { SVG_XMLNS } from '../../index';
import styles from './index.module.less';

function Dashboard() {
  const dashboard = useRef<HTMLDivElement>(null);
  useDashboardSize(dashboard);

  return (
    <div className={styles.dashboard} ref={dashboard}>
      {/* 网格线 */}
      <SplitLine
        width={dashboard.current?.offsetWidth as number}
        height={dashboard.current?.offsetHeight as number}
      />
      <svg xmlns={SVG_XMLNS}></svg>
    </div>
  );
}

function SplitLine({ width, height }: { width: number; height: number }) {
  const splitLine = useMemo(() => {
    if (height && width) {
      const vertical = Math.ceil(width / 100);
      // const scaleTopLine =
    }
  }, [height, width]);

  return (
    <svg xmlns={SVG_XMLNS} className={styles.splitLine}>
      asd
    </svg>
  );
}

export default Dashboard;
