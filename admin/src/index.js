import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MovieContextProvider } from './context/movieContext/movieContext';
ReactDOM.render(
  <React.StrictMode>
    <MovieContextProvider>
      
    </MovieContextProvider>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
