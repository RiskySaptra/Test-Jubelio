import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import "./index.css";
import App from "./App";

import ProductStore from "./stores/Product.Store";

ReactDOM.render(
  <Provider productStore={new ProductStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
