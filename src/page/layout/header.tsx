import React, { useState } from 'react';
import styles from './index.module.less';
import { Button } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import CodeModal from '../../components/codeModal';

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
  const [modalVisible, setModalVisible] = useState(false);

  const setVisible = (visible: boolean) => {
    setModalVisible(visible);
  };

  return (
    <div className={styles.header}>
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
