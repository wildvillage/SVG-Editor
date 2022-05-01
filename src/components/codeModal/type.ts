export type CodeModalProps = {
  visible: boolean,
  /** svg代码，支持已经转换的代码或者直接使用svg-dom */
  code: string,
  setVisible: (v: boolean) => void,
};

export type CodePanelProps = {
  code: string,
};
