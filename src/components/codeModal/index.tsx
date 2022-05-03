import { useMemo, useEffect, memo } from 'react';
import { Modal, Tooltip } from 'antd';
import Prism from 'prismjs';
import ClipboardJS from 'clipboard';
import { CodeModalProps, CodePanelProps } from './type';
import styles from './index.module.less';
import copy from './copy.svg';
import 'prismjs/themes/prism-okaidia.css';

function CodeModal(props: CodeModalProps) {
  const { visible, code, setVisible } = props;

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <Modal
      title="SVG code"
      visible={visible}
      onOk={handleClick}
      onCancel={handleClick}
      className={styles.modal}
      okText="确定"
      width="750px"
    >
      <CodePanel code={code} />
    </Modal>
  );
}

const CodePanel = memo(({ code }: CodePanelProps) => {
  const codeString = useMemo((): string => {
    return Prism.highlight(code!, Prism.languages.svg, 'Markup');
  }, [code]);

  useEffect(() => {
    new ClipboardJS(`.${styles.copy}`);
  }, [code]);

  return (
    <div className={styles.codeContainer}>
      <Tooltip title="copied" trigger="click">
        <img
          src={copy}
          alt="copy"
          className={styles.copy}
          data-clipboard-text={code}
        />
      </Tooltip>
      <code dangerouslySetInnerHTML={{ __html: codeString }} />
    </div>
  );
});

export default memo(CodeModal);
