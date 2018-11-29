import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from '../../store';
import AppRouter from '../AppRouter';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <CssBaseline />
          <AppRouter />
        </React.Fragment>
      </Provider>
    );
  }
}

export default hot(module)(App);
