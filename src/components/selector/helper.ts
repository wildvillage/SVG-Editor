import { RenderItem } from '../../store/type';

export const generateSelectorFrame = (selected: RenderItem | null) => {
  if (selected) {
    const { type, attrs } = selected;
    switch (type) {
      case 'rect':
        const { width, height, x, y } = attrs as App.Rect;
        return { width, height, x, y };
      case 'line':
        const { x1, x2, y1, y2 } = attrs as App.Line;
        return {
          width: Math.abs(x1 - x2),
          height: Math.abs(y1 - y2),
          x: x1,
          y: y1,
        };
      default:
        return { width: 0, height: 0, x: 0, y: 0 };
    }
  }
  return { width: 0, height: 0, x: 0, y: 0 };
};
