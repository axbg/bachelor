import React from 'react';
import './App.css';
import Shell from './components/smart/shell';
import UnprotectedRouter from './components/dumb/unprotectedRouter';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5598CC'
    }
  }
});

function shouldAutoLogin() {
  return window.localStorage.getItem("auth-token") ? true : false;
  //return window.localStorage.getItem("auth-token") ? false : true;
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {shouldAutoLogin() ? <Shell /> : <UnprotectedRouter />}
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
