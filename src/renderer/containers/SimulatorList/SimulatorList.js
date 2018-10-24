import React from 'react';

import Typography from '@material-ui/core/Typography';

import { UPDATE_SIMULATOR_LIST, UPDATE_SIMULATOR_SETTINGS, APP_CONFIG } from '../../../main/ipcEvents';

import SimulatorVZero from '../Simulator/Simulator-v0';
import SimulatorVOne from '../Simulator/Simulator-v1';
import Separator from '../../components/Separator';

class SimulatorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simulatorList: {},
      userSimpleClasses: {},
      userPositionClasses: {},
      coreVersion: 'v1'
    };

    window.ipcRenderer.on(APP_CONFIG, this.setAppConfig);
    window.ipcRenderer.on(UPDATE_SIMULATOR_LIST, this.setV0SimulatorListData);
    window.ipcRenderer.on(UPDATE_SIMULATOR_SETTINGS, this.setV0SimulatorSettings);
  }

  setAppConfig = (event, settings) => {
    const userSimpleClasses = (
      settings.userSimpleClasses && settings.userSimpleClasses[0] !== '' ?
        settings.userSimpleClasses :
        undefined
    );

    const userPositionClasses = (
      settings.userPositionClasses && settings.userPositionClasses[0] !== '' ?
        settings.userPositionClasses :
        undefined
    );

    const { simulator: { coreVersion } } = settings;

    this.setState({
      userSimpleClasses,
      userPositionClasses,
      coreVersion
    });
  }

  setV0SimulatorListData = (event, data) => {
    Object.keys(data).forEach((url) => {
      data[url].settings.movementRegisteredAreasOpen = false;
      data[url].settings.simpleRegisteredAreasOpen = false;
      data[url].settings.positionRegisteredAreasOpen = false;
    });

    this.setState({
      simulatorList: data
    });
  }

  setV0SimulatorSettings = (event, data) => {
    const {
      movementRegisteredAreasOpen,
      simpleRegisteredAreasOpen,
      positionRegisteredAreasOpen
    } = this.state.simulatorList[data.url].settings;

    data.settings.movementRegisteredAreasOpen = movementRegisteredAreasOpen;
    data.settings.simpleRegisteredAreasOpen = simpleRegisteredAreasOpen;
    data.settings.positionRegisteredAreasOpen = positionRegisteredAreasOpen;

    this.setState({
      simulatorList: {
        ...this.state.simulatorList,
        [data.url]: {
          ...this.state.simulatorList[data.url],
          ...data
        }
      }
    });
  }

  closeSimulator = (url) => window.admin.closeSimulator(url);
  focusSimulator = (url) => window.admin.focusSimulator(url);
  openDevTools = (url) => window.admin.openDevTools(url);

  updateSimulatorSettings = (url, settings) => new Promise((resolve) => {
    this.setState({
      simulatorList: {
        ...this.state.simulatorList,
        [url]: {
          ...this.state.simulatorList[url],
          ...settings
        }
      }
    }, resolve);
  });

  render() {
    const Simulator = this.state.coreVersion === 'v1' ? SimulatorVOne : SimulatorVZero;
    const simulatorListArr = Object.values(this.state.simulatorList);
    const simulators = simulatorListArr.length > 0 ?
      Object.keys(this.state.simulatorList).map((url) => (
        <Simulator
          key={url}
          url={url}
          version={this.state.coreVersion}
          data={this.state.simulatorList[url]}
          onCloseSimulator={this.closeSimulator}
          onFocusSimulator={this.focusSimulator}
          openDevTools={this.openDevTools}
          userSimpleClasses={this.state.userSimpleClasses}
          userPositionClasses={this.state.userPositionClasses}
          updateSimulatorSettings={this.updateSimulatorSettings}
        />
      )) : (
        <React.Fragment>
          <Typography variant="display1">
            {'Looks like you haven\'t loaded any simulators :('}
          </Typography>

          <Separator />

          <Typography variant="subheading">
            You can do that via the URL field above or by dragging an HTML file here
          </Typography>
        </React.Fragment>
      );

    return simulators;
  }
}

export default SimulatorList;

