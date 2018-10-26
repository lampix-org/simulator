import React from 'react';

import Typography from '@material-ui/core/Typography';

import { UPDATE_SIMULATOR_LIST, UPDATE_SIMULATOR_SETTINGS, APP_CONFIG } from '../../../main/ipcEvents';

import Simulator from '../Simulator/Simulator';
import Separator from '../../components/Separator';

class SimulatorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simulatorList: {},
      userDefinedClasses: {}
    };

    window.ipcRenderer.on(APP_CONFIG, this.setAppConfig);
    window.ipcRenderer.on(UPDATE_SIMULATOR_LIST, this.setSimulatorListData);
    window.ipcRenderer.on(UPDATE_SIMULATOR_SETTINGS, this.setSimulatorSettings);
  }

  setAppConfig = (event, settings) => {
    const userDefinedClasses = (
      settings.userDefinedClasses && settings.userDefinedClasses[0] !== '' ?
        settings.userDefinedClasses :
        undefined
    );

    this.setState({
      userDefinedClasses
    });
  }

  setSimulatorListData = (event, data) => {
    this.setState({
      simulatorList: data
    });
  }

  setSimulatorSettings = (event, data) => {
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

  updateSimulator = (url, settings) => new Promise((resolve) => {
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
    const simulatorListArr = Object.values(this.state.simulatorList);
    const simulators = simulatorListArr.length > 0 ?
      Object.keys(this.state.simulatorList).map((url) => (
        <Simulator
          key={url}
          url={url}
          data={this.state.simulatorList[url]}
          closeSimulator={this.closeSimulator}
          focusSimulator={this.focusSimulator}
          openDevTools={this.openDevTools}
          userDefinedClasses={this.state.userDefinedClasses}
          updateSimulator={this.updateSimulator}
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

