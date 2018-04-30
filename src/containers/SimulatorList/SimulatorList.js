import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions
} from 'material-ui/ExpansionPanel';
import { Grid, Paper } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';

import { ipcRenderer } from 'electron';
import { UPDATE_SIMULATOR_LIST } from '../../main-process/ipcEvents';

const styles = {
  paperInnerContentTitle: {
    paddingLeft: 5
  },
  paperInnerContentText: {
    paddingLeft: 10,
    margin: 5
  },
  expansionPanelDetails: {
    display: 'block',
    backgroundColor: '#eeeeee'
  },
  darkBackground: {
    backgroundColor: '#eeeeee'
  },
  divider: {
    backgroundColor: 'white'
  },
  marginLeft: {
    marginLeft: 15
  }
};

class SimulatorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      simulatorList: {
        'http://localhost:8080': {
          movementDetector: true,
          simple: {
            classifier: 'book',
            recognizedClass: '2',
            metadata: 'What a save!'
          },
          position: {
            classifier: null,
            recognizedClass: null,
            metadata: null
          }
        },
        'http://localhost:3030': {
          movementDetector: false,
          simple: {
            classifier: 'cls_loc_fin_all_small',
            recognizedClass: '1',
            metadata: null
          },
          position: {
            classifier: 'cls_loc_cars',
            recognizedClass: '1',
            metadata: 'Frunza verde de ciment, foarte bine, excelent'
          }
        },
        'http://localhost:2020': {
          movementDetector: false,
          simple: {
            classifier: null,
            recognizedClass: null,
            metadata: null
          },
          position: {
            classifier: null,
            recognizedClass: null,
            metadata: null
          }
        }
      },
      classifierOptions: [
        'cls_loc_fin_all_small',
        'book',
        'cls_loc_cars'
      ],
      classOption: [
        '1',
        '2',
        '3'
      ]
    };
  }

updateSimulatorList = () => {
  ipcRenderer.on(UPDATE_SIMULATOR_LIST, (event, data) => {
    this.setState({
      simulatorList: data
    });
  });
}

handleMovementDetectorChange = (event, url) => {
  const simulatorList = { ...this.state.simulatorList };
  simulatorList[url].movementDetector = event.target.checked;
  this.setState({
    simulatorList
  });
}

handleSimpleClassifierChange = (event, url) => {
  const simulatorList = { ...this.state.simulatorList };
  simulatorList[url].simple.classifier = event.target.value;
  this.setState({
    simulatorList
  });
}

handleSimpleRecognizedClassChange = (event, url) => {
  const simulatorList = { ...this.state.simulatorList };
  simulatorList[url].simple.recognizedClass = event.target.value;
  this.setState({
    simulatorList
  });
}

handleSimpleMetadataChange = (event, url) => {
  const simulatorList = { ...this.state.simulatorList };
  simulatorList[url].simple.metadata = event.target.value;
  this.setState({
    simulatorList
  });
}

handlePositionClassifierChange = (event, url) => {
  const simulatorList = { ...this.state.simulatorList };
  simulatorList[url].position.classifier = event.target.value;
  this.setState({
    simulatorList
  });
}

handlePositionRecognizedClassChange = (event, url) => {
  const simulatorList = { ...this.state.simulatorList };
  simulatorList[url].position.recognizedClass = event.target.value;
  this.setState({
    simulatorList
  });
}

handlePositionMetadataChange = (event, url) => {
  const simulatorList = { ...this.state.simulatorList };
  simulatorList[url].position.metadata = event.target.value;
  this.setState({
    simulatorList
  });
}

render() {
  const { classes } = this.props;
  const classifierMenuItems = this.state.classifierOptions.map(classifier => (
    <MenuItem
      key={classifier}
      value={classifier}
    >
      {classifier}
    </MenuItem>
  ));
  const recognizedClassMenuItems = this.state.classOption.map(recognizedClass => (
    <MenuItem
      key={recognizedClass}
      value={recognizedClass}
    >
      {recognizedClass}
    </MenuItem>
  ));

  const simulators = Object.keys(this.state.simulatorList).map((url) => {
    const simulator = this.state.simulatorList[url];
    return (
      <div key={url}>
        <ExpansionPanel >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <span > Simulator : {url} </span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <span className={classes.paperInnerContentTitle}>
                  { 'Settings' }
                </span>
              </Grid>
              <Grid item xs={12}>
                <span className={classes.paperInnerContentText}>  { 'Movement detector:' } </span>
                <Switch
                  checked={simulator.movementDetector}
                  onChange={(evt) => this.handleMovementDetectorChange(evt, url)}
                  value="simulator.movementDetector"
                />
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <div className={classes.paperInnerContentTitle}>
                    { 'Simple classifier:' }
                  </div>
                  <span className={classes.paperInnerContentText}>
                    { 'classifier:' }
                  </span>
                  <Select
                    value={simulator.simple.classifier || ''}
                    onChange={(evt) => this.handleSimpleClassifierChange(evt, url)}
                    className={classes.marginLeft}
                  >
                    { classifierMenuItems }
                  </Select>
                  <div className={classes.paperInnerContentText}>
                    <span>
                      { 'recognized class:' }
                    </span>
                    <Select
                      value={simulator.simple.recognizedClass || ''}
                      onChange={(evt) => this.handleSimpleRecognizedClassChange(evt, url)}
                      className={classes.marginLeft}
                    >
                      { recognizedClassMenuItems }
                    </Select>
                  </div>
                  <div className={classes.paperInnerContentText}>
                    <span>
                      { 'metadata:' }
                    </span>
                    <TextField
                      id={`metadata_simple_${url}`}
                      value={simulator.simple.metadata || ''}
                      onChange={(evt) => this.handleSimpleMetadataChange(evt, url)}
                      margin="normal"
                      className={classes.marginLeft}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <div className={classes.paperInnerContentTitle}>
                    { 'Position classifier:' }
                  </div>
                  <div className={classes.paperInnerContentText}>
                    <span>
                      { 'classifier:' }
                    </span>
                    <Select
                      value={simulator.position.classifier || ''}
                      onChange={(evt) => this.handlePositionClassifierChange(evt, url)}
                      className={classes.marginLeft}
                    >
                      { classifierMenuItems }
                    </Select>
                  </div>
                  <div className={classes.paperInnerContentText}>
                    <span>
                      { 'recognized class:' }
                    </span>
                    <Select
                      value={simulator.position.recognizedClass || ''}
                      onChange={(evt) => this.handlePositionRecognizedClassChange(evt, url)}
                      className={classes.marginLeft}
                    >
                      { recognizedClassMenuItems }
                    </Select>
                  </div>
                  <div className={classes.paperInnerContentText}>
                    <span>
                      { 'metadata:'}
                    </span>
                    <TextField
                      id={`metadata_position_${url}`}
                      value={simulator.position.metadata || ''}
                      onChange={(evt) => this.handlePositionMetadataChange(evt, url)}
                      margin="normal"
                      className={classes.marginLeft}
                    />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
          <Divider className={classes.divider} />
          <ExpansionPanelActions className={classes.darkBackground}>
            <Button size="small" >Close simulator</Button>
            <Button size="small" color="primary">Focus</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  });

  return (
    <div>
      <div> { simulators } </div>
    </div>
  );
}
}

SimulatorList.propTypes = {
  classes: PropTypes.object.isRequired // eslint-disable-line
};

export default withStyles(styles)(SimulatorList);
