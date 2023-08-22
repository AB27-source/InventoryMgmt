import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// Material Dashboard 2 React Context Provider
// import { MaterialUIControllerProvider } from "context";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      {/* <MaterialUIControllerProvider> */}
        <App />
      {/* </MaterialUIControllerProvider> */}
  </React.StrictMode>
);

