import React, { useMemo } from 'react';
import { generateSelectorFrame } from './helper';
import { SelectorProps } from './type';

function Selector(props: SelectorProps) {
  const { selected } = props;

  const { width, height, x, y } = useMemo(() => {
    return generateSelectorFrame(selected);
  }, [selected]);

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
}

export default Selector;
