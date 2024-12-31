import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import rootReducer from './Reducer/index.js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// export const store = configureStore({
//   reducer:rootReducer,
// });



createRoot(document.getElementById('root')).render(
  <StrictMode>
  {/* <Provider store = {store}> */}
    <App />
  {/* </Provider> */}
  </StrictMode>,
)