import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore
import { Provider } from 'react-redux'; 
import rootReducer from "./reducer/index.js";
import  { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./components/core/Auth/AuthContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
 reducer: rootReducer
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
         <BrowserRouter>
           <App />
          <Toaster />
         </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
