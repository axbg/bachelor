import React from 'react';
import './App.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import Shell from './components/smart/shell';
import UnprotectedRouter from './components/dumb/unprotectedRouter';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ReduxToastr from 'react-redux-toastr'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5598CC'
    }
  }
});

function shouldAutoLogin() {
  return window.localStorage.getItem("auth-token") ? true : false;
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {shouldAutoLogin() ? <Shell /> : <UnprotectedRouter />}
      </BrowserRouter>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-left"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick />
    </MuiThemeProvider>
  );
}

export default App;
