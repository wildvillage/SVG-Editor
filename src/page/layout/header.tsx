import React, { useState, useMemo } from 'react';
import cls from 'classnames';
import { Button, Input, Tooltip } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import CodeModal from '../../components/codeModal';
import { useDispatch } from 'react-redux';
import { setSelector } from '../../store/tool';
import { DEFAULT_FILE_NAME } from '../../index';
import styles from './index.module.less';

const Header: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>(DEFAULT_FILE_NAME);
  const [nameInputFlag, setNameInputFlag] = useState<boolean>(false);
  const [svgCode, setSvgCode] = useState<string>('');
  const dispatch = useDispatch();

  const setVisible = (visible: boolean) => {
    setModalVisible(visible);
  };

  const onLeave = () => {
    setNameInputFlag(false);
    if (!fileName) {
      setFileName(DEFAULT_FILE_NAME);
    }
  };

  const handleVisible = () => {
    // 使用一个简易的promise来延缓modal打开
    new Promise((resolve) => {
      dispatch(setSelector(false));
      resolve('');
    }).then(() => {
      const svg = document.getElementById('board');
      setSvgCode(svg!.outerHTML);
      setModalVisible(true);
    });
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
            })}
          >
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
      <Button icon={<CodeOutlined />} onClick={handleVisible}>
        Code
      </Button>
      <CodeModal
        visible={modalVisible}
        code={svgCode}
        setVisible={setVisible}
      />
    </div>
  );
};

export default Header;
