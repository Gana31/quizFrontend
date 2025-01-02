import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import rootReducer from './Reducer/index.js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const store = configureStore({
  reducer:rootReducer,
});



createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <BrowserRouter>
  <StrictMode>
    <App />
    <ToastContainer limit={1} />
  </StrictMode>
    </BrowserRouter>
  </Provider>
)
