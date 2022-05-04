export const setting = {
  /** 圆形 */
  circle: {
    default: {
      cx: 100,
      cy: 100,
      r: 100,
      fill: '#fff',
    },
    geometric: {
      cx: 100,
      cy: 100,
      r: 100,
    },
    notGeometric: {
      color: '#fff',
    },
  },
  /** 椭圆 */
  ellipse: {
    default: {
      cx: 100,
      cy: 100,
      rx: 100,
      ry: 100,
      fill: '#fff',
    },
    geometric: {
      cx: 100,
      cy: 100,
      rx: 100,
      ry: 100,
    },
    notGeometric: {
      color: '#fff',
    },
  },
  /** 直线 */
  line: {
    default: {
      length: 100,
      stroke: 'red',
    },
    position: {
      top: 100,
      left: 100,
    },
    geometric: {
      x1: 100,
      y1: 100,
      x2: 100,
      y2: 100,
    },
    notGeometric: {
      stroke: 'red',
    },
  },
  /** 矩形 */
  rect: {
    default: {
      x: 100,
      y: 100,
      rx: 0,
      ry: 0,
      width: 100,
      height: 50,
      fill: 'transparent',
      stroke: 'red',
    },
  },
};

export const lineSetting = {
  default: {
    length: 100,
    stroke: '#000',
  },
  position: {
    top: 100,
    left: 100,
  },
  geometric: {
    x1: 100,
    y1: 100,
    x2: 100,
    y2: 100,
  },
  notGeometric: {
    stroke: '#000',
  },
};

export const rectSetting = {
  default: {
    x: 100,
    y: 100,
    rx: 0,
    ry: 0,
    width: 100,
    height: 50,
    fill: 'transparent',
    stroke: '#000',
  },
  position: {
    top: 100,
    left: 100,
  },
  geometric: {
    x: 100,
    y: 100,
    width: 100,
    height: 50,
    rx: 0,
    ry: 0,
  },
  notGeometric: {
    fill: 'transparent',
    stroke: '#000',
  },
};

export const ellipseSetting = {
  default: {
    cx: 100,
    cy: 100,
    rx: 100,
    ry: 100,
    fill: '#000',
  },
  geometric: {
    cx: 100,
    cy: 100,
    rx: 100,
    ry: 100,
  },
  notGeometric: {
    color: '#000',
  },
};

export const circleSetting = {
  default: {
    cx: 100,
    cy: 100,
    r: 100,
    fill: '#000',
  },
  geometric: {
    cx: 100,
    cy: 100,
    r: 100,
  },
  notGeometric: {
    color: '#000',
  },
};
