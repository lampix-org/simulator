import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions
} from 'material-ui/ExpansionPanel';
import { Grid, Paper } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Collapse from 'material-ui/transitions/Collapse';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

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
  },
  listDivider: {
    backgroundColor: 'black'
  },
  registeredArea: {
    display: 'block'
  },
  listItemText: {
    paddingLeft: 0
  }
};

class Simulator extends React.Component {
  handleMovementRegisteredAreasClick = (url) => {
    console.log('handleMovementRegisteredAreasClick url ', url);
  }

  handleSimpleRegisteredAreasClick = (url) => {
    console.log('handleSimpleRegisteredAreasClick url ', url);
  }

  handlePositionRegisteredAreasClick = (url) => {
    console.log('handlePositionRegisteredAreasClick url ', url);
  }

  closeSimulator = (url) => {
    console.log('closeSimulator url ', url);
  }

  focusSimulator = (url) => {
    console.log('focusSimulator url ', url);
  }

  render() {
    const { classes } = this.props;
    const simulator = this.props.simulatorData;
    const url = simulator.appUrl;
    const simulatorRegisteredData = simulator.registeredData;
    const movementRectangles = simulator.registeredData.movement.rectangles;
    const simpleRectangles = simulator.registeredData.simple.rectangles;
    const positionRectangles = simulator.registeredData.position.rectangles;
    const simpleClassifiers = simulator.registeredData.simple.classifiers;
    const positionClassifiers = simulator.registeredData.position.classifiers;
    const simpleClasses = simulator.registeredData.simple.classes;
    const positionClasses = simulator.registeredData.position.classes;

    const movementRegisteredAreas = (simulatorRegisteredData && movementRectangles) ?
      movementRectangles.map((rectangle) => (
        <ListItem className={classes.registeredArea}>
          <ListItemText className={classes.listItemText} primary={`X: ${rectangle.posX}`} />
          <ListItemText className={classes.listItemText} primary={`Y: ${rectangle.posX}`} />
          <ListItemText className={classes.listItemText} primary={`Width: ${rectangle.width}`} />
          <ListItemText className={classes.listItemText} primary={`Height: ${rectangle.height}`} />
        </ListItem>
      )) : null;
    const simpleRegisteredAreas = (simulatorRegisteredData && simpleRectangles) ?
      simpleRectangles.map((rectangle) => (
        <ListItem className={classes.registeredArea}>
          <ListItemText className={classes.listItemText} primary={`X: ${rectangle.posX}`} />
          <ListItemText className={classes.listItemText}primary={`Y: ${rectangle.posX}`} />
          <ListItemText className={classes.listItemText} primary={`Width: ${rectangle.width}`} />
          <ListItemText className={classes.listItemText} primary={`Height: ${rectangle.height}`} />
          <ListItemText className={classes.listItemText} primary={`Classifier: ${rectangle.classifier}`} />
        </ListItem>
      )) : null;

    const positionRegisteredAreas = (simulatorRegisteredData && positionRectangles) ?
      positionRectangles.map((rectangle) => (
        <ListItem className={classes.registeredArea}>
          <ListItemText className={classes.listItemText} primary={`X: ${rectangle.posX}`} />
          <ListItemText className={classes.listItemText} primary={`Y: ${rectangle.posX}`} />
          <ListItemText className={classes.listItemText} primary={`Width: ${rectangle.width}`} />
          <ListItemText className={classes.listItemText} primary={`Height: ${rectangle.height}`} />
          <ListItemText className={classes.listItemText} primary={`Classifier: ${rectangle.classifier}`} />
        </ListItem>
      )) : null;
    const classifierSimpleMenuItems = simpleClassifiers ?
      simpleClassifiers.map(classifier => (
        <MenuItem
          key={classifier}
          value={classifier}
        >
          {classifier}
        </MenuItem>
      )) : null;
    const classifierPositionMenuItems = positionClassifiers ?
      positionClassifiers.map(classifier => (
        <MenuItem
          key={classifier}
          value={classifier}
        >
          {classifier}
        </MenuItem>
      )) : null;
    const recognizedSimpleClassMenuItems = simpleClasses ?
      simpleClasses.map(recognizedClass => (
        <MenuItem
          key={recognizedClass}
          value={recognizedClass}
        >
          {recognizedClass}
        </MenuItem>
      )) : null;
    const recognizedPositionClassMenuItems = positionClasses ?
      positionClasses.map(recognizedClass => (
        <MenuItem
          key={recognizedClass}
          value={recognizedClass}
        >
          {recognizedClass}
        </MenuItem>
      )) : null;
    return (
      <div key={url}>
        <ExpansionPanel >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <span> Simulator : {url} </span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <span className={classes.paperInnerContentTitle}>
                  Settings
                </span>
              </Grid>
              <Grid item xs={12}>
                <span className={classes.paperInnerContentText}>  { 'Movement detector:' } </span>
                <Switch
                  checked={simulator.settings.movementDetector}
                  onChange={(evt) => this.props.onMovementDetectorChange(evt, url)}
                />
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <div className={classes.paperInnerContentTitle}>
                    Simple classifier:
                  </div>
                  <span className={classes.paperInnerContentText}>
                    classifier:
                  </span>
                  <Select
                    value={simulator.settings.simple.classifier || ''}
                    onChange={(evt) => this.props.onSimpleClassifierChange(evt, url)}
                    className={classes.marginLeft}
                  >
                    { classifierSimpleMenuItems }
                  </Select>
                  <div className={classes.paperInnerContentText}>
                    <span>
                      recognized class:
                    </span>
                    <Select
                      value={simulator.settings.simple.recognizedClass || ''}
                      onChange={(evt) => this.props.onSimpleRecognizedClassChange(evt, url)}
                      className={classes.marginLeft}
                    >
                      { recognizedSimpleClassMenuItems }
                    </Select>
                  </div>
                  <div className={classes.paperInnerContentText}>
                    <span>
                      metadata:
                    </span>
                    <TextField
                      id={`metadata_simple_${url}`}
                      value={simulator.settings.simple.metadata || ''}
                      onChange={(evt) => this.props.onSimpleMetadataChange(evt, url)}
                      margin="normal"
                      className={classes.marginLeft}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <div className={classes.paperInnerContentTitle}>
                    Position classifier:
                  </div>
                  <div className={classes.paperInnerContentText}>
                    <span>
                      classifier:
                    </span>
                    <Select
                      value={simulator.settings.position.classifier || ''}
                      onChange={(evt) => this.props.onPositionClassifierChange(evt, url)}
                      className={classes.marginLeft}
                    >
                      { classifierPositionMenuItems }
                    </Select>
                  </div>
                  <div className={classes.paperInnerContentText}>
                    <span>
                      recognized class:
                    </span>
                    <Select
                      value={simulator.settings.position.recognizedClass || ''}
                      onChange={(evt) => this.props.onPositionRecognizedClassChange(evt, url)}
                      className={classes.marginLeft}
                    >
                      { recognizedPositionClassMenuItems }
                    </Select>
                  </div>
                  <div className={classes.paperInnerContentText}>
                    <span>
                      metadata:
                    </span>
                    <TextField
                      id={`metadata_position_${url}`}
                      value={simulator.settings.position.metadata || ''}
                      onChange={(evt) => this.props.onPositionMetadataChange(evt, url)}
                      margin="normal"
                      className={classes.marginLeft}
                    />
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Divider className={classes.listDivider} />
            <List component="nav">
              <ListItem button onClick={() => this.props.onMovementRegisteredAreasClick(url)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Movement" />
                { simulator.settings.movementRegisteredAreasOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={simulator.settings.movementRegisteredAreasOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  { movementRegisteredAreas }
                </List>
              </Collapse>
              <Divider className={classes.listDivider} />
              <ListItem button onClick={() => this.props.onSimpleRegisteredAreasClick(url)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Simple" />
                { simulator.settings.simpleRegisteredAreasOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={simulator.settings.simpleRegisteredAreasOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  { simpleRegisteredAreas }
                </List>
              </Collapse>
              <Divider className={classes.listDivider} />
              <ListItem button onClick={() => this.props.onPositionRegisteredAreasClick(url)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Position" />
                { simulator.settings.positionRegisteredAreasOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={simulator.settings.positionRegisteredAreasOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  { positionRegisteredAreas }
                </List>
              </Collapse>
            </List>
          </ExpansionPanelDetails>
          <Divider className={classes.divider} />
          <ExpansionPanelActions className={classes.darkBackground}>
            <Button size="small" onClick={() => this.props.onCloseSimulator(url)}>Close simulator</Button>
            <Button size="small" onClick={() => this.props.onFocusSimulator(url)} color="primary">Focus</Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

Simulator.propTypes = {
  simulatorData: PropTypes.object.isRequired, // eslint-disable-line
  classes: PropTypes.object.isRequired, // eslint-disable-line
  onMovementDetectorChange: PropTypes.func.isRequired,
  onSimpleClassifierChange: PropTypes.func.isRequired,
  onSimpleRecognizedClassChange: PropTypes.func.isRequired,
  onSimpleMetadataChange: PropTypes.func.isRequired,
  onPositionClassifierChange: PropTypes.func.isRequired,
  onPositionRecognizedClassChange: PropTypes.func.isRequired,
  onPositionMetadataChange: PropTypes.func.isRequired,
  onCloseSimulator: PropTypes.func.isRequired,
  onFocusSimulator: PropTypes.func.isRequired,
  onMovementRegisteredAreasClick: PropTypes.func.isRequired,
  onSimpleRegisteredAreasClick: PropTypes.func.isRequired,
  onPositionRegisteredAreasClick: PropTypes.func.isRequired

};

export default withStyles(styles)(Simulator);
