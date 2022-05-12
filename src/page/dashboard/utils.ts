import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import { Dispatch as ReduxDispatch, AnyAction } from '@reduxjs/toolkit';
import { addSvg } from '../../store/dashboard';
import { setCurrentForm, setSelector } from '../../store/tool';
import { RenderItem } from '../../store/type';
import { lineSetting, rectSetting } from '../../settings/action';
import { calcPosition } from '../../utils';
import { SelectorProps } from './type';

/** 添加新的svg图形 */
export const addSvgTag = (
  typeText: string,
  event: any,
  tagId: MutableRefObject<number>,
  render: RenderItem[],
  setTagAttr: Dispatch<SetStateAction<SelectorProps>>,
  dispatch: ReduxDispatch<AnyAction>
) => {
  switch (typeText) {
    case '"line"':
      addLine(event, tagId, render, setTagAttr, dispatch);
      break;
    case '"rect"':
      addRect(event, tagId, render, setTagAttr, dispatch);
      break;
    default:
  }
};

/** 添加直线 */
const addLine = (
  event: any,
  tagId: MutableRefObject<number>,
  render: RenderItem[],
  setTagAttr: Dispatch<SetStateAction<SelectorProps>>,
  dispatch: ReduxDispatch<AnyAction>
) => {
  const { default: _default } = lineSetting;
  const { x1, y1, x2, y2 } = calcPosition(
    event.offsetX,
    event.offsetY,
    _default.length
  );
  dispatch(
    addSvg([
      ...render,
      {
        id: tagId.current,
        type: 'line',
        attrs: { x1, y1, x2, y2, stroke: _default.stroke },
      },
    ])
  );
  dispatch(
    setCurrentForm({
      id: tagId.current,
      type: 'line',
      attrs: { x1, y1, x2, y2, stroke: _default.stroke },
    })
  );
  setTagAttr({
    width: Math.abs(x1 - x2),
    height: Math.abs(y1 - y2),
    x: event.offsetX,
    y: event.offsetY,
  });
  dispatch(setSelector(true));
};

/** 添加矩形 */
const addRect = (
  event: any,
  tagId: MutableRefObject<number>,
  render: RenderItem[],
  setTagAttr: Dispatch<SetStateAction<SelectorProps>>,
  dispatch: ReduxDispatch<AnyAction>
) => {
  const { default: _default } = rectSetting;
  dispatch(
    addSvg([
      ...render,
      {
        id: tagId.current,
        type: 'rect',
        attrs: { ..._default, x: event.offsetX, y: event.offsetY },
      },
    ])
  );
  dispatch(
    setCurrentForm({
      id: tagId.current,
      type: 'rect',
      attrs: { ..._default, x: event.offsetX, y: event.offsetY },
    })
  );
  setTagAttr({
    width: _default.width,
    height: _default.height,
    x: event.offsetX,
    y: event.offsetY,
  });
  dispatch(setSelector(true));
};

/** 选中画布上的svg图形 */
export const handleSvgTag = () => {};
