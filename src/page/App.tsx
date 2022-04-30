import React from 'react';
import styles from './App.module.less';
import Header from './layout/header';
import Slider from './layout/slider';
import Main from './layout/main';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Slider></Slider>
      <div className={styles.layout}>
        <Header></Header>
        <Main></Main>
      </div>
    </div>
  );
};

export default App;
