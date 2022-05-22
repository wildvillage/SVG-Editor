import { ScaleConfig } from './type';
import { RenderItem } from '../../store/type';
import { SVG_XMLNS } from '../../index';

/** 生成刻度尺 */
export const generateScaleLines = (
  scale: number,
  step: number,
  type: 'top' | 'left'
): ScaleConfig[] => {
  const STROKE = '#007';
  if (type === 'top') {
    return new Array(scale).fill(null).map((item, idx) => {
      return {
        x1: idx * step,
        y1: 0,
        x2: idx * step,
        y2: idx % 5 ? 6 : 13,
        stroke: STROKE,
        strokeWidth: idx % 5 ? 1 : 1.5,
      };
    });
  } else {
    return new Array(scale).fill(null).map((item, idx) => {
      return {
        x1: 0,
        y1: idx * step,
        x2: idx % 5 ? 6 : 13,
        y2: idx * step,
        stroke: STROKE,
        strokeWidth: idx % 5 ? 1 : 1.5,
      };
    });
  }
};

/** 生成网格线 */
export const generateSplitLine = (
  split: number,
  step: number,
  type: 'vertical' | 'horizontal'
) => {
  const STROKE = '#ccc5';
  if (type === 'vertical') {
    return new Array(split).fill(null).map((item, idx) => {
      return {
        x1: idx * step,
        y1: 0,
        x2: idx * step,
        y2: '100%',
        stroke: STROKE,
        strokeWidth: idx % 5 ? 1 : 1.5,
      };
    });
  } else {
    return new Array(split).fill(null).map((item, idx) => {
      return {
        x1: 0,
        y1: idx * step,
        x2: '100%',
        y2: idx * step,
        stroke: STROKE,
        strokeWidth: idx % 5 ? 1 : 1.5,
      };
    });
  }
};

/** 通过 render 生成svg代码 */
export const generateSvgCode = (render: RenderItem[]): string => {
  let svgCode = '';
  render.forEach((r) => {
    const { type, attrs } = r;
    const attrsStr = Object.keys(attrs)
      // @ts-ignore
      .map((key) => `${key}="${attrs[key]}"`)
      .join(' ');

    switch (type) {
      case 'line':
        svgCode += `<line ${attrsStr}/>`;
        break;
      case 'rect':
        svgCode += `<rect ${attrsStr}/>`;
        break;
      default:
        svgCode += '';
    }
  });
  const dashboard = document.getElementById('board');
  const width = dashboard?.clientWidth;
  const height = dashboard?.clientHeight;

  return (
    `<svg xmlns="${SVG_XMLNS}" width="${width}" height="${height}">` +
    svgCode +
    `</svg>`
  );
};
