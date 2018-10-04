import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// IPC Events
import {
  ADMIN_UI_READY,
  ERROR
} from '../../../main/ipcEvents';

import ButtonAppBar from '../../components/ButtonAppBar';
import SimulatorList from '../SimulatorList';
import SimulatorListContainer from '../SimulatorList/SimulatorListContainer';

import Notifications from '../Notifications';
import { queue } from '../Notifications/actions';
import { notificationTypes } from '../Notifications/constants';

class Core extends Component {
  componentDidMount() {
    const { showMessage } = this.props;

    window.ipcRenderer.send(ADMIN_UI_READY);
    window.ipcRenderer.on(ERROR, (event, errorMessage) => {
      showMessage(errorMessage, notificationTypes.error);
    });
  }

  render() {
    return (
      <React.Fragment>
        <ButtonAppBar />

        <SimulatorListContainer>
          <SimulatorList />
        </SimulatorListContainer>

        <Notifications />
      </React.Fragment>
    );
  }
}

Core.propTypes = {
  showMessage: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  showMessage: (message, variant) => dispatch(queue(message, variant))
});

Core = connect(null, mapDispatchToProps)(Core);

export default Core;
