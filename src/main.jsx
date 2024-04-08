import React from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrateRoot } from 'react-dom/client'; 
import "./index.css";
import Api from "./services/api.js";
import store from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import 'react-toastify/dist/ReactToastify.css';
import { persistStore } from "redux-persist";
import App from "./App.jsx";

const persistor = persistStore(store);
Api.init({ url: process.env.REACT_APP_BASE_URL });
hydrateRoot(
  document.getElementById("root"),
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
