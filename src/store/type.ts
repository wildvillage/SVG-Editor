export type Tool = {
  /** 是否显示网格线 */
  showSplitLine: boolean;
  currentForm: RenderItem;
  showSelector: boolean;
};

export type SvgType = 'line' | 'circle' | 'rect';

export type RenderItem = {
  id: string;
  type: SvgType;
  attrs: App.Line | App.Rect;
};

export type DashBoard = {
  line?: App.Line[];
  rect?: App.Rect[];
  render: RenderItem[];
};
