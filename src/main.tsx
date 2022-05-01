import React from "react";
import ReactDOM from "react-dom/client";
import App from "./page/App";
import "./styles/index.less";
import 'normalize.css';
import "antd/dist/antd.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
