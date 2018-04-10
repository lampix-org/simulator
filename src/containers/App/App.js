import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import store from '../../store';
import Core from '../Core';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Core />
      </Provider>
    );
  }
}

export default hot(module)(App);
