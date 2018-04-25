import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';


import { ipcRenderer } from 'electron';
import { UPDATE_SIMULATOR_LIST } from '../../main-process/ipcEvents';

class SimulatorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      simulatorList: {}
    };
  }

updateSimulatorList = () => {
  ipcRenderer.on(UPDATE_SIMULATOR_LIST, (event, data) => {
    this.setState({
      simulatorList: data
    });
  });
}

render() {
  const simulators = Object.keys(this.state.simulatorList).map((simulator) => (
    <div key={simulator.appUrl}>
      <ExpansionPanel>
        <ExpansionPanelSummary >
          <Typography> {simulator.appUrl} </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {simulator.settings}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  ));

  return (
    <div >
      simulators
    </div>
  );
}
}

export {
  SimulatorList
};
