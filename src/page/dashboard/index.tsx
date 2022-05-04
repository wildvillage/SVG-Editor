import { useRef, useMemo } from 'react';
import { useDashboardSize } from '../../utils';
import { generateSplitLine } from '../layout/utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { SVG_XMLNS, SCALE_STEP } from '../../index';
import styles from './index.module.less';
import { nanoid } from 'nanoid';
import { useDrop } from 'ahooks';
import { lineSetting, rectSetting } from '../../settings/action';
import { calcPosition } from '../../utils';
import { addSvg } from '../../store/dashboard';
import { setCurrentForm } from '../../store/tool';

function Dashboard() {
  const dashboard = useRef<HTMLDivElement>(null);
  const globalId = useRef<number>(1);
  const dispatch = useDispatch();
  const { render } = useSelector((state: RootState) => state.dashboard);

  useDashboardSize(dashboard);

  const board = useRef(null);

  useDrop(board, {
    onText: (text, e: any) => {
      if (text === '"line"') {
        const { default: _default } = lineSetting;
        const { x1, y1, x2, y2 } = calcPosition(
          e.offsetX,
          e.offsetY,
          _default.length
        );
        dispatch(
          addSvg([
            ...render,
            {
              id: globalId.current,
              type: 'line',
              attrs: { x1, y1, x2, y2, stroke: _default.stroke },
            },
          ])
        );
        dispatch(
          setCurrentForm({
            id: globalId.current,
            type: 'line',
            attrs: { x1, y1, x2, y2, stroke: _default.stroke },
          })
        );
      }
      if (text === '"rect"') {
        const { default: _default } = rectSetting;
        dispatch(
          addSvg([
            ...render,
            {
              id: globalId.current,
              type: 'rect',
              attrs: { ..._default, x: e.offsetX, y: e.offsetY },
            },
          ])
        );
        dispatch(
          setCurrentForm({
            id: globalId.current,
            type: 'rect',
            attrs: { ..._default, x: e.offsetX, y: e.offsetY },
          })
        );
      }
      globalId.current++;
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
        {render.map(({ id, type, attrs }) => {
          if (type === 'line') {
            return <line key={id} {...attrs} />;
          } else {
            return <rect key={id} {...attrs} />;
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
