import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Classification from './components/Classification';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
       <Router>
      <Routes>
        <Route exact path="/" element={<App/>} />
        <Route path="/home" element={<App/>} />
        <Route path="/classification" element={<Classification/>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
{/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
