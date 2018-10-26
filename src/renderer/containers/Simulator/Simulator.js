import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

// Custom components
import Dropdown from '../../components/Dropdown';

const styles = () => ({
  expansionPanel: {
    minWidth: '40%',
    maxWidth: '100%'
  },
  expansionPanelDetails: {
    flexDirection: 'column',
    padding: 24
  }
});

const emptyStringIfNil = (value) => {
  if (value == null) {
    return '';
  }

  return value;
};

class Simulator extends React.Component {
  handleWatcherNameChange = (event) => {
    const { updateSimulator, data, url } = this.props;
    const watcherName = event.target.value;
    const simulator = { ...data };
    simulator.settings.watcherName = watcherName;

    updateSimulator(url, simulator).then(() => {
      window.admin.setWatcherName(url, watcherName);
    });
  }

  handleRecognizedClassChange = (event) => {
    const { updateSimulator, data, url } = this.props;
    const recognizedClass = event.target.value;
    const simulator = { ...data };
    simulator.settings.recognizedClass = recognizedClass;

    updateSimulator(url, simulator).then(() => {
      window.admin.setRecognizedClass(url, recognizedClass);
    });
  }

  handleMetadataChange = (event) => {
    const { updateSimulator, data, url } = this.props;
    const metadata = event.target.value;
    const simulator = { ...data };
    simulator.settings.metadata = metadata;

    updateSimulator(url, simulator).then(() => {
      window.admin.setMetadata(url, metadata);
    });
  }

  handleRegisteredAreaClick = (url, category, classifier) => {
    window.admin.changeCategoryClassifier(url, category, classifier);
  };

  createMenuItem = (data) => (
    <MenuItem
      key={data}
      value={data}
    >
      {data}
    </MenuItem>
  );

  renderWatcherOptions() {
    const {
      url,
      data
    } = this.props;
    const { watcherData, settings } = data;
    const {
      names: watcherNames,
      classes
    } = watcherData;

    const watcherNamesMenuItems = watcherNames ? watcherNames.map(this.createMenuItem) : null;
    const recognizedClassMenuItems = classes ? classes.map(this.createMenuItem) : null;

    return (
      <React.Fragment>
        <Typography variant="title">
          Watcher options
        </Typography>

        <FormControl fullWidth>
          <InputLabel>Name</InputLabel>
          <Dropdown
            disabled={watcherNames.length === 0}
            value={emptyStringIfNil(settings.watcherName)}
            onChange={(evt) => this.handleWatcherNameChange(evt, url)}
          >
            {watcherNamesMenuItems}
          </Dropdown>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Recognized class</InputLabel>
          <Dropdown
            disabled={watcherNames.length === 0}
            value={emptyStringIfNil(settings.recognizedClass)}
            onChange={(evt) => this.handleRecognizedClassChange(evt, url)}
          >
            {recognizedClassMenuItems}
          </Dropdown>
        </FormControl>
        <TextField
          disabled={watcherNames.length === 0}
          value={emptyStringIfNil(settings.metadata)}
          onChange={(evt) => this.handleMetadataChange(evt, url)}
          label="Metadata"
          fullWidth
        />
      </React.Fragment>
    );
  }

  render() {
    const {
      classes,
      url,
      openDevTools,
      closeSimulator,
      focusSimulator
    } = this.props;

    return (
      <ExpansionPanel key={url} className={classes.expansionPanel}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography variant="subheading">Simulator {url}</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          {this.renderWatcherOptions()}
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            size="small"
            onClick={() => openDevTools(url)}
          >
            DevTools
          </Button>
          <Button
            size="small"
            onClick={() => closeSimulator(url)}
          >
            Close
          </Button>
          <Button
            size="small"
            onClick={() => focusSimulator(url)}
            color="primary"
          >
            Focus
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

Simulator.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line
  classes: PropTypes.shape({
    expansionPanel: PropTypes.string,
    expansionPanelDetails: PropTypes.string
  }).isRequired,
  url: PropTypes.string.isRequired,
  closeSimulator: PropTypes.func.isRequired,
  focusSimulator: PropTypes.func.isRequired,
  openDevTools: PropTypes.func.isRequired,
  updateSimulator: PropTypes.func.isRequired
};

export default withStyles(styles)(Simulator);
