import React from "react";
import ReactDOM from "react-dom/client";
import { store } from './store'
import { Provider } from 'react-redux'
import App from "./page/App";
import "./styles/index.less";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
