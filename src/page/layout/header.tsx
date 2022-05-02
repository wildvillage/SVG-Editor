import React, { useState } from 'react';
import cls from 'classnames';
import { Button, Input, Tooltip } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import CodeModal from '../../components/codeModal';
import { DEFAULT_FILE_NAME } from '../../index';
import styles from './index.module.less';

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const mockCode: string = `
  <svg xmlns="http://www.w3.org/2000/svg">
    <circle
      cx='250'
      cy='75'
      r='25'
      fill="#c4c4c4" 
    />
  </svg>
`;

const Header: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>(DEFAULT_FILE_NAME);
  const [nameInputFlag, setNameInputFlag] = useState<boolean>(false);

  const setVisible = (visible: boolean) => {
    setModalVisible(visible);
  };

  const onLeave = () => {
    setNameInputFlag(false);
    if (!fileName) {
      setFileName(DEFAULT_FILE_NAME);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.fileName}>
        <Tooltip title="双击修改图形名" placement="bottomLeft">
          <span
            onDoubleClick={() => setNameInputFlag(true)}
            className={cls({
              [styles.visible]: !nameInputFlag,
              [styles.hidden]: nameInputFlag,
            })}>
            {fileName}
          </span>
        </Tooltip>
        <Input
          value={fileName}
          className={cls({
            [styles.visible]: nameInputFlag,
            [styles.hidden]: !nameInputFlag,
          })}
          onBlur={onLeave}
          onPressEnter={onLeave}
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>
      <Button icon={<CodeOutlined />} onClick={() => setModalVisible(true)}>
        Code
      </Button>
      <CodeModal
        visible={modalVisible}
        code={mockCode}
        setVisible={setVisible}
      />
    </div>
  );
};

export default Header;
