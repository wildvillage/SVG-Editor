import { useRef, useMemo } from 'react';
import { useDashboardSize } from '../../utils';
import { generateSplitLine } from '../layout/utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { SVG_XMLNS, SCALE_STEP } from '../../index';
import styles from './index.module.less';
import { nanoid } from 'nanoid';
import { useDrop } from 'ahooks';
import { setting } from '../../settings/action';
import { calcPosition } from '../../utils';
import { setLine, setRect } from '../../store/dashboard';
import { setCurrentForm } from '../../store/tool';

function Dashboard() {
  const dashboard = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { line, rect } = useSelector((state: RootState) => state.dashboard);

  useDashboardSize(dashboard);

  const board = useRef(null);

  useDrop(board, {
    onText: (text, e: any) => {
      if (text === '"line"') {
        const { default: _default } = setting.line;
        const { x1, y1, x2, y2 } = calcPosition(
          e.offsetX,
          e.offsetY,
          _default.length
        );
        dispatch(
          setLine([...line, { x1, y1, x2, y2, stroke: _default.stroke }])
        );
        dispatch(setCurrentForm({ x1, y1, x2, y2, stroke: _default.stroke }));
      }
      if (text === '"rect"') {
        const { default: _default } = setting.rect;
        dispatch(
          setRect([...rect, { ..._default, x: e.offsetX, y: e.offsetY }])
        );
      }
    },
  });

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

      <svg xmlns={SVG_XMLNS} ref={board} id="board">
        {line.map((ele, i) => (
          <line key={i} {...ele} />
        ))}
        {rect.map((ele, i) => (
          <rect key={i} {...ele}></rect>
        ))}
      </svg>
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
