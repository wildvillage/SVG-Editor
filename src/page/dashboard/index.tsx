import { useRef, useMemo, useState, Fragment } from 'react';
import { useDashboardSize, calcPosition } from '../../utils';
import { generateSplitLine } from '../layout/utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { SVG_XMLNS, SCALE_STEP } from '../../index';
import { nanoid } from 'nanoid';
import { useDrop, useEventListener } from 'ahooks';
import { setCurrentForm } from '../../store/tool';
import { addSvgTag } from './utils';
import { SelectorProps } from './type';
import styles from './index.module.less';

const defaultSelectorProps = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

function Dashboard() {
  const [tagAttr, setTagAttr] = useState<SelectorProps>(defaultSelectorProps);
  const dashboard = useRef<HTMLDivElement>(null);
  const globalId = useRef<number>(1);
  const board = useRef(null);
  useDashboardSize(dashboard);
  const { render } = useSelector((state: RootState) => state.dashboard);
  const { showSplitLine, showSelector } = useSelector(
    (state: RootState) => state.tool
  );
  const dispatch = useDispatch();

  useDrop(board, {
    onText: (text, e: any) => {
      addSvgTag(text, e, globalId, render, setTagAttr, dispatch);
      globalId.current++;
    },
  });

  useEventListener('click', (e: Event) => {
    const id = (e.target as SVGAElement).id;
    if (id) {
      const t = render.find((item) => item.id === parseInt(id));
      if (t) {
        const { type, attrs } = t;

        if (type === 'rect') {
          const { x, y, width, height } = attrs as App.Rect;
          setTagAttr({
            width,
            height,
            x,
            y,
          });
          dispatch(
            setCurrentForm({
              id,
              type: 'rect',
              attrs,
            })
          );
        } else if (type === 'line') {
          const { x1, x2, y1, y2 } = attrs as App.Line;
          setTagAttr({
            width: Math.abs(x1 - x2),
            height: Math.abs(y1 - y2),
            x: x1,
            y: y1,
          });
          dispatch(
            setCurrentForm({
              id,
              type: 'line',
              attrs,
            })
          );
        }
      }
    }
  });

  return (
    <div className={styles.dashboard} ref={dashboard}>
      {/* 网格线 */}
      {showSplitLine && (
        <SplitLine
          width={dashboard.current?.offsetWidth as number}
          height={dashboard.current?.offsetHeight as number}
        />
      )}

      <svg
        xmlns={SVG_XMLNS}
        width={dashboard.current?.offsetWidth}
        height={dashboard.current?.offsetHeight}
        // 保留viewBox，之后会用到
        // viewBox={`0 0 ${dashboard.current?.offsetWidth} ${dashboard.current?.offsetHeight}`}
        ref={board}
        id="board"
      >
        {render.map(({ id, type, attrs }) => {
          if (type === 'line') {
            const { x1, y1, x2 } = attrs as App.Line;
            const rectAttrs = {
              x: x1,
              y: y1 - 10,
              width: x2 - x1,
              height: 20,
              fill: 'transparent',
            };
            return (
              <Fragment key={id}>
                <line {...attrs} id={id + ''} />
                <rect id={id + ''} {...rectAttrs} />
              </Fragment>
            );
          } else {
            return <rect key={id} {...attrs} id={id + ''} />;
          }
        })}
        {showSelector && <Selector {...tagAttr} />}
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

const Selector = (props: SelectorProps) => {
  const { width, height, x, y } = props;
  const tagAttr = {
    width: width + 5,
    height: height + 5,
    x: x - 2.5,
    y: y - 2.5,
  };
  const baseAttr = {
    stroke: '#3366FF',
    fill: '#3366FF',
    width: '5',
    height: '5',
  };

  return (
    <g fill="transparent">
      {/* 整体框选 */}
      <rect
        stroke="#3366FF"
        fill="transparent"
        strokeWidth="2.5"
        {...tagAttr}
      />
      {/* 8个顶点 */}
      <rect {...baseAttr} x={x - 5} y={y - 5} />
      <rect {...baseAttr} x={x + width} y={y - 5} />
      <rect {...baseAttr} x={x - 5} y={y + height} />
      <rect {...baseAttr} x={x + width} y={y + height} />
      <rect {...baseAttr} x={x + width / 2 - 2.5} y={y - 5} />
      <rect {...baseAttr} x={x + width / 2 - 2.5} y={y + height} />
      <rect {...baseAttr} x={x - 5} y={y + height / 2 - 2.5} />
      <rect {...baseAttr} x={x + width} y={y + height / 2 - 2.5} />
      {/* 画一个工具选项🤔 */}
    </g>
  );
};

export default Dashboard;
