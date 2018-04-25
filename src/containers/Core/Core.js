import React, { Component } from 'react';

import ButtonAppBar from '../../components/ButtonAppBar';
import { SimulatorList } from '../SimulatorList';

class Core extends Component {
  render() {
    return (
      <div>
        <ButtonAppBar />
        <SimulatorList />
      </div>
    );
  }
}

export default Core;
