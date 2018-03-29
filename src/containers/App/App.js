import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import store from '../../store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <h1>Time to get cracking!</h1>
      </Provider>
    );
  }
}

export default hot(module)(App);
