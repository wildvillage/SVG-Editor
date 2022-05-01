import { useRef } from 'react';
import { useDashboardSize } from '../../utils';
import { SVG_XMLNS } from '../../index';
import styles from './index.module.less';

function Dashboard() {
  const dashboard = useRef<HTMLDivElement>(null);
  useDashboardSize(dashboard);

  return (
    <div className={styles.dashboard} ref={dashboard}>
      <svg xmlns={SVG_XMLNS}></svg>
    </div>
  );
}

export default Dashboard;
