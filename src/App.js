import React from 'react';
import './App.css';
import Shell from './components/smart/shell';
import Login from './components/smart/login';
import { BrowserRouter } from 'react-router-dom';

function shouldAutoLogin() {
  return window.localStorage.getItem("auth-token") ? true : false;
  //return window.localStorage.getItem("auth-token") ? false : true;
}

function App() {
  return (
    <BrowserRouter>
      {shouldAutoLogin() ? <Shell /> : <Login />}
    </BrowserRouter>
  );
}

export default App;
