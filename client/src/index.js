/**
 *
 * @Component Index.js
 * @Description Mount the application into the DOM, wrapping it with the Redux Store
 *
 */

import React from "react";
import ReactDOM from "react-dom";
import "./styles/PageStyles/index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
