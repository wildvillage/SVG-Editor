export function calcPosition(offsetX: number, offsetY: number, length: number) {
  return {
    x1: offsetX,
    y1: offsetY,
    x2: offsetX + length,
    y2: offsetY,
  };
}
