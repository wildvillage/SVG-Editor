import React, { useEffect, useRef } from 'react';
import styles from './index.module.less';
import { Divider } from 'antd';
import { HolderOutlined } from '@ant-design/icons';
import { useEventListener } from 'ahooks';

type MoveProps = {
  children?: React.ReactNode;
  render?: React.ReactNode;
};

type PostionInfo = {
  baseLeft?: number;
  baseTop?: number;
  currentLeft?: number;
  currentTop?: number;
};

const moveWapper: React.FC<MoveProps> = (props) => {
  const { render, children } = props;
  const drag = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const varible = useRef<PostionInfo>({});

  const move = (e: MouseEvent) => {
    const {
      baseLeft = 0,
      baseTop = 0,
      currentLeft = 0,
      currentTop = 0,
    } = varible.current || {};
    const boxDom = box.current;
    if (boxDom) {
      const style = boxDom.style;
      style.left = e.pageX - (baseLeft + currentLeft) + 'px';
      style.top = e.pageY - (baseTop + currentTop) + 'px';
    }
  };

  useEffect(() => {
    const varibleDom = varible.current;
    if (varibleDom) {
      varibleDom.baseLeft = drag.current?.offsetLeft;
      varibleDom.baseTop = drag.current?.offsetTop;
    }
  }, []);

  const listen = (e: MouseEvent) => {
    const varibleDom = varible.current;
    if (varibleDom) {
      varibleDom.currentLeft = e.offsetX;
      varibleDom.currentTop = e.offsetY;
    }
    document.body.addEventListener('mousemove', move);
    document.body.addEventListener('mouseup', () => {
      document.body.removeEventListener('mousemove', move);
    });
  };
  useEventListener('mousedown', listen, { target: drag });
  return (
    <div className={styles['move-wapper']} ref={box}>
      <div className={styles.drag} ref={drag}>
        <HolderOutlined style={{ fontSize: '20px' }} />
      </div>
      <Divider type="vertical"></Divider>
      {render ? render : children}
    </div>
  );
};

export default moveWapper;
