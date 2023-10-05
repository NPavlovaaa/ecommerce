import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import './index.css';
import './config/configureMobX';
import 'regenerator-runtime';
import {HashRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
  </React.StrictMode>,
)
if (module.hot) {
    module.hot.accept();
}