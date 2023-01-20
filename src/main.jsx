import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App.jsx";
import "./locales/i18n.js";

document.title = import.meta.env.VITE_APP_TITLE;

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
);
