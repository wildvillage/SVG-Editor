import { useRef, useMemo } from 'react';
import { useDashboardSize } from '../../utils';
import { generateSplitLine } from '../layout/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SVG_XMLNS, SCALE_STEP } from '../../index';
import styles from './index.module.less';
import { nanoid } from '@reduxjs/toolkit';
import { useDrop, useSetState } from 'ahooks';
import { setting } from '../../settings/action';
import { calcPosition } from '../../utils';

type State = {
  line: any[];
  circle: any[];
};

function Dashboard() {
  const dashboard = useRef<HTMLDivElement>(null);

  const [svgData, setSvgData] = useSetState<State>({
    line: [],
    circle: [],
  });

  useDashboardSize(dashboard);
  const board = useRef(null);
  useDrop(board, {
    onText: (text, e: any) => {
      if (text === '"line"') {
        setSvgData((prev) => {
          const { line } = prev;
          const { default: _default } = setting.line;
          const { x1, y1, x2, y2 } = calcPosition(
            e.offsetX,
            e.offsetY,
            _default.length
          );
          return {
            line: [...line, { x1, y1, x2, y2, stroke: _default.stroke }],
          };
        });
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
        {Object.keys(svgData).map((item) => {
          if (item === 'line') {
            return svgData.line.map((ele, i) => {
              return <line key={i} {...ele} />;
            });
          } else if (item === 'circle') {
            return svgData.circle.map((ele, i) => {
              return <circle key={i} {...ele} />;
            });
          }
        })}
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
