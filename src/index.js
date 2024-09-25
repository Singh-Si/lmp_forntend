import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MotorContextAppProvider } from './MultiStepContextApi';
import { UserContextAppProvider } from './UserContextAppProvider';
import { store } from './redux/store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <UserContextAppProvider>
      <MotorContextAppProvider>
        <App />
      </MotorContextAppProvider>
    </UserContextAppProvider>
  </Provider>
  // </React.StrictMode>
);

reportWebVitals();

// export const API_URL = "https://lmpapi.handsintechnology.in"
export const API_URL = "http://localhost:8000"
const hostname = window.location.host
export const forntendurl = window.location.protocol + "//" + hostname;
