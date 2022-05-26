import { useRef, useMemo, useState, Fragment, useEffect } from 'react';
import { useDashboardSize } from '../../utils';
import { generateSplitLine } from '../layout/helper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { SVG_XMLNS, SCALE_STEP } from '../../index';
import { nanoid } from 'nanoid';
import { useDrop, useEventListener } from 'ahooks';
import { setCurrentForm, setSelector } from '../../store/tool';
import { removeRenderItem } from '../../store/dashboard';
import { addSvgTag } from './utils';
import Selector from '../../components/selector';
import { SelectorProps } from '../../components/selector/type';
import styles from './index.module.less';

function Dashboard() {
  const [currSelectedItem, setCurrSelectedItem] =
    useState<SelectorProps['selected']>(null);
  const dashboard = useRef<HTMLDivElement>(null);
  const board = useRef(null);
  useDashboardSize(dashboard);
  const { render } = useSelector((state: RootState) => state.dashboard);
  const { showSplitLine, showSelector, currentForm } = useSelector(
    (state: RootState) => state.tool
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (render.length) {
      setCurrSelectedItem(render.find((item) => item.id === currentForm.id)!);
    }
  }, [render]);

  useDrop(board, {
    onText: (text, e: any) => {
      addSvgTag(text, e, nanoid(), render, setCurrSelectedItem, dispatch);
    },
  });

  useEventListener('click', (e: Event) => {
    const id = (e.target as SVGAElement).id;
    if (id) {
      const t = render.find((item) => item.id === id);
      if (t) {
        setCurrSelectedItem(t);
        const { type, attrs } = t;

        if (type === 'rect') {
          dispatch(
            setCurrentForm({
              id,
              type: 'rect',
              attrs,
            })
          );
          dispatch(setSelector(true));
        } else if (type === 'line') {
          dispatch(
            setCurrentForm({
              id,
              type: 'line',
              attrs,
            })
          );
          dispatch(setSelector(true));
        }
      }
    }
  });

  // 监听键盘事件，移除选中的图形
  useEventListener('keydown', (e: KeyboardEvent) => {
    const { code } = e;
    // 按下删除键并且当前选中框存在时，才执行remove操作
    if (code === 'Backspace' && showSelector && e.target === document.body) {
      dispatch(removeRenderItem(currentForm.id));
      dispatch(setSelector(false));
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
            const { x1, y1, x2, y2 } = attrs as App.Line;
            const rectAttrs = {
              x: Math.min(x1, x2),
              y: y1 === y2 ? y1 - 5 : Math.min(y1, y2),
              width: Math.abs(x2 - x1),
              height: Math.abs(y1 - y2) || 10,
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
        {showSelector && <Selector selected={currSelectedItem} />}
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
