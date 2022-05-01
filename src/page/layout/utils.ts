import { ScaleConfig } from './type';

export const generateScaleLines = (
  scale: number,
  step: number,
  type: 'top' | 'left'
): ScaleConfig[] => {
  const STROKE = '#0007';
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
