import { useRef, useMemo, useState, Fragment, useEffect } from 'react';
import { useDashboardSize } from '../../utils';
import { generateSplitLine } from '../layout/helper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { SVG_XMLNS, SCALE_STEP } from '../../index';
import { nanoid } from 'nanoid';
import { useDrop, useEventListener } from 'ahooks';
import { setCurrentForm, setSelector } from '../../store/tool';
import { remove } from '../../store/dashboard';
import { addSvgTag, calcLineRectPosition } from './utils';
import Selector from '../../components/selector';
import { SelectorProps } from '../../components/selector/type';
import styles from './index.module.less';

function Dashboard() {
  const [currSelectedItem, setCurrSelectedItem] = useState<SelectorProps['selected']>(null);
  const dashboard = useRef<HTMLDivElement>(null);
  const board = useRef(null);
  useDashboardSize(dashboard);
  const { render } = useSelector((state: RootState) => state.dashboard);
  const { showSplitLine, showSelector, currentForm } = useSelector((state: RootState) => state.tool);
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

  // ??????????????????????????????????????????
  useEventListener('keydown', (e: KeyboardEvent) => {
    const { code } = e;
    // ?????????????????????????????????????????????????????????remove??????
    if (code === 'Backspace' && showSelector && e.target === document.body) {
      dispatch(remove(currentForm.id));
      dispatch(setSelector(false));
    }
  });

  return (
    <div className={styles.dashboard} ref={dashboard}>
      {/* ????????? */}
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
        // ??????viewBox??????????????????
        // viewBox={`0 0 ${dashboard.current?.offsetWidth} ${dashboard.current?.offsetHeight}`}
        ref={board}
        id="board"
      >
        {render.map(({ id, type, attrs }) => {
          if (type === 'line') {
            const { x1, y1, x2, y2 } = attrs as App.Line;
            const { rotate, rotateCenter, realWidth } = calcLineRectPosition(x1, x2, y1, y2);
            const rectAttrs = {
              x: x1,
              y: y1 - 5,
              width: realWidth,
              height: 10,
              fill: 'transparent',
              transform: `rotate(${rotate} ${rotateCenter})`,
            };
            return (
              <Fragment key={id}>
                <line {...attrs} id={id} />
                <rect id={id} {...rectAttrs} />
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
      const verticalLine = generateSplitLine(vertical * 5, SCALE_STEP, 'vertical');

      const horizontal = Math.ceil(height / 100);
      const horizontalLine = generateSplitLine(horizontal * 5, SCALE_STEP, 'horizontal');
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
