import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import { Grid, Paper } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

import { ipcRenderer } from 'electron';
import { UPDATE_SIMULATOR_LIST } from '../../main-process/ipcEvents';

const styles = {
  paperInnerContentTitle: {
    paddingLeft: 5
  },
  paperInnerContentText: {
    paddingLeft: 10
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
      }
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
  const { classes } = this.props;
  const simulators = Object.keys(this.state.simulatorList).map((url) => {
    const simulator = this.state.simulatorList[url];
    return (
      <div key={url} >
        <ExpansionPanel >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography > Simulator : {url} </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant="body2" className={classes.paperInnerContentTitle}>
                  { 'Settings' }
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.paperInnerContentText}>
                  { `Movement detector: ${simulator.movementDetector}` }
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <Typography variant="body2" className={classes.paperInnerContentTitle}>
                    { 'Simple classifier:' }
                  </Typography>
                  <Typography className={classes.paperInnerContentText}>
                    { `classifier: ${simulator.simple.classifier}` }
                  </Typography>
                  <Typography className={classes.paperInnerContentText}>
                    { `recognized class: ${simulator.simple.recognizedClass}` }
                  </Typography>
                  <Typography className={classes.paperInnerContentText}>
                    { `metadata: ${simulator.simple.metadata}` }
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <Typography variant="body2" className={classes.paperInnerContentTitle}>
                    { 'Position classifier:' }
                  </Typography>
                  <Typography className={classes.paperInnerContentText}>
                    { `classifier: ${simulator.position.classifier}` }
                  </Typography>
                  <Typography className={classes.paperInnerContentText}>
                    { `recognized class: ${simulator.position.recognizedClass}`}
                  </Typography>
                  <Typography className={classes.paperInnerContentText}>
                    { `metadata: ${simulator.position.metadata}`}
                  </Typography>
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
