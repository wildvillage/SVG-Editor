export type CodeModalProps = {
  visible: boolean;
  /** svg代码 */
  code: string | undefined;
  setVisible: (v: boolean) => void;
};

export type CodePanelProps = {
  code: string | undefined;
};
