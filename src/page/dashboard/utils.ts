import { Dispatch, SetStateAction } from 'react';
import { Dispatch as ReduxDispatch, AnyAction } from '@reduxjs/toolkit';
import { add } from '../../store/dashboard';
import { setCurrentForm, setSelector } from '../../store/tool';
import { RenderItem } from '../../store/type';
import { lineSetting, rectSetting } from '../../settings/action';
import { calcPosition } from '../../utils';
import { SelectorProps } from '../../components/selector/type';
import { LineRectPosition } from './type';

/** 添加新的svg图形 */
export const addSvgTag = (
  typeText: string,
  event: any,
  tagId: string,
  render: RenderItem[],
  setCurrSelectedItem: Dispatch<SetStateAction<SelectorProps['selected']>>,
  dispatch: ReduxDispatch<AnyAction>
) => {
  switch (typeText) {
    case '"line"':
      addLine(event, tagId, render, setCurrSelectedItem, dispatch);
      break;
    case '"rect"':
      addRect(event, tagId, render, setCurrSelectedItem, dispatch);
      break;
    default:
  }
};

/** 添加直线 */
const addLine = (
  event: any,
  tagId: string,
  render: RenderItem[],
  setCurrSelectedItem: Dispatch<SetStateAction<SelectorProps['selected']>>,
  dispatch: ReduxDispatch<AnyAction>
) => {
  const { default: _default } = lineSetting;
  const { x1, y1, x2, y2 } = calcPosition(event.offsetX, event.offsetY, _default.length);
  dispatch(
    add({
      id: tagId,
      type: 'line',
      attrs: { x1, y1, x2, y2, stroke: _default.stroke },
    })
  );
  dispatch(
    setCurrentForm({
      id: tagId,
      type: 'line',
      attrs: { x1, y1, x2, y2, stroke: _default.stroke },
    })
  );
  setCurrSelectedItem({
    id: tagId,
    type: 'line',
    attrs: { x1, y1, x2, y2, stroke: _default.stroke },
  });
  dispatch(setSelector(true));
};

/** 添加矩形 */
const addRect = (
  event: any,
  tagId: string,
  render: RenderItem[],
  setCurrSelectedItem: Dispatch<SetStateAction<SelectorProps['selected']>>,
  dispatch: ReduxDispatch<AnyAction>
) => {
  const { default: _default } = rectSetting;
  dispatch(
    add({
      id: tagId,
      type: 'rect',
      attrs: { ..._default, x: event.offsetX, y: event.offsetY },
    })
  );
  dispatch(
    setCurrentForm({
      id: tagId,
      type: 'rect',
      attrs: { ..._default, x: event.offsetX, y: event.offsetY },
    })
  );
  setCurrSelectedItem({
    id: tagId,
    type: 'rect',
    attrs: { ..._default, x: event.offsetX, y: event.offsetY },
  });
  dispatch(setSelector(true));
};

/** 计算line的隐形rect的width 旋转角度 旋转中心点 */
export const calcLineRectPosition = (x1: number, x2: number, y1: number, y2: number): LineRectPosition => {
  /** 旋转角度 */
  const rotate = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  /** 旋转中心 */
  const rotateCenter = `${x1} ${y1}`;
  /** 旋转后的实际width */
  const realWidth = Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));

  return {
    rotate,
    rotateCenter,
    realWidth,
  };
};
