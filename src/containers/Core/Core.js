import React, { Component } from 'react';

import { ADMIN_UI_READY } from '../../main-process/ipcEvents';

import ButtonAppBar from '../../components/ButtonAppBar';
import SimulatorList from '../SimulatorList';
import SimulatorListContainer from '../SimulatorList/SimulatorListContainer';

class Core extends Component {
  componentDidMount() {
    window.ipcRenderer.send(ADMIN_UI_READY);
  }

  render() {
    return (
      <React.Fragment>
        <ButtonAppBar />

        <SimulatorListContainer>
          <SimulatorList />
        </SimulatorListContainer>
      </React.Fragment>
    );
  }
}

export default Core;
