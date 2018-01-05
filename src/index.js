import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import LayoutContainer from "./containers/layoutContainer";
import { Provider } from "react-redux";
import configureStore from "./store";

export const store = configureStore();

const $app = document.getElementById("app");

ReactDOM.render(
  <Provider store={store}>
    <LayoutContainer />
  </Provider>,
  $app
);
