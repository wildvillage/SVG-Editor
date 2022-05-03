export type Tool = {
  /** 是否显示网格线 */
  showSplitLine: boolean;
  currentForm: Record<string, any>;
};

export type DashBoard = {
  line: App.Line[];
  rect: App.Rect[];
};
