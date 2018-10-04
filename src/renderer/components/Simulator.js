import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// Custom components
import Separator from './Separator';
import Dropdown from './Dropdown';

import {
  SIMPLE,
  POSITION,
  MOVEMENT
} from '../../common/constants';

const {
  DEFAULT_WINDOW_WIDTH,
  DEFAULT_WINDOW_HEIGHT
} = require('../../main/constants');

const DEFAULT_DISPLAY_SIZE = 5;

const styles = () => ({
  registeredAreaContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  slider: {
    maxHeight: 0,
    transition: 'max-height 0.15s ease-out',
    overflow: 'hidden'
  },
  registeredArea: {
    margin: 10,
    '&:hover $slider': {
      maxHeight: 500,
      transition: 'max-height 0.25s ease-in',
    },
  },
  expansionPanelDetails: {
    flexDirection: 'column'
  },
  clickableCard: {
    cursor: 'pointer',
    transition: 'transform 200ms ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  registeredAreaDiv: {
    backgroundColor: 'black',
    position: 'relative',
    height: '5vh',
    width: '5vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  registeredAreaParent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  }
});

const emptyStringIfNil = (value) => {
  if (value == null) {
    return '';
  }

  return value;
};

class Simulator extends React.Component {
  renderWatcher = (rect, category) => {
    const { handleRegisteredAreaClick, url, classes } = this.props;

    const divHeightConvertedToPx = (window.innerHeight * DEFAULT_DISPLAY_SIZE) / 100;
    const divWidthConvertedToPx = (window.innerWidth * DEFAULT_DISPLAY_SIZE) / 100;

    const widthScaleDownFactor = Math.round(DEFAULT_WINDOW_WIDTH / divWidthConvertedToPx);
    const heightScaleDownFactor = Math.round(DEFAULT_WINDOW_HEIGHT / divHeightConvertedToPx);
    const registeredAreaLocationWidth = rect.width > 0 ?
      Math.round(rect.width / widthScaleDownFactor) : DEFAULT_DISPLAY_SIZE;
    const registeredAreaLocationHeight = rect.height > 0 ?
      Math.round(rect.height / heightScaleDownFactor) : DEFAULT_DISPLAY_SIZE;
    const registeredAreaLocationLeft = rect.posX > 0 ?
      Math.round(rect.posX / widthScaleDownFactor) : 0;
    const registeredAreaLocationTop = rect.posY > 0 ? Math.round(rect.posY / heightScaleDownFactor) : 0;

    const registeredAreaLocation = {
      backgroundColor: 'white',
      position: 'absolute',
      width: registeredAreaLocationWidth,
      height: registeredAreaLocationHeight,
      left: registeredAreaLocationLeft,
      top: registeredAreaLocationTop
    };

    return (
      <Card
        key={`${rect.posX}/${rect.posY}`}
        className={`${classes.registeredArea} ${classes.clickableCard}`}
        onClick={() => handleRegisteredAreaClick(url, category, rect.classifier)}
      >
        <CardContent >
          {
            rect.classifier &&
            <div>
              <Typography variant="body1">Classifier: {rect.classifier}</Typography>
              <Separator divider />
            </div>
          }
          {
            (rect.classifier || category === MOVEMENT) &&
            <div>
              <div className={`${classes.registeredAreaParent}`}>
                <div className={`${classes.registeredAreaDiv}`}>
                  <div style={registeredAreaLocation}></div>
                </div>
              </div>
            </div>
          }
          <div className={`${classes.slider}`} >
            <Typography variant="body1">X: {rect.posX}</Typography>
            <Typography variant="body1">Y: {rect.posY}</Typography>
            <Typography variant="body1">Width: {rect.width}</Typography>
            <Typography variant="body1">Height: {rect.height}</Typography>
          </div>
        </CardContent>
      </Card>

    );
  };

  render() {
    const {
      classes,
      url,
      data,
      userSimpleClasses,
      userPositionClasses
    } = this.props;
    const { watcherData } = data;
    const {
      names: classifierNames,
      watchers: classifierWatchers
    } = watcherData.classifiers;
    const {
      names: segmenterNames,
      watchers: segmenterWatchers
    } = watcherData.segmenters;

    const {
      watchers: movementWatchers
    } = watcherData.movement || { watchers: [] };

    const classifierClasses = (userSimpleClasses && userSimpleClasses.length > 0) ?
      userSimpleClasses : watcherData.classifiers.classes;
    const segmenterClasses = (userPositionClasses && userPositionClasses.length > 0) ?
      userPositionClasses : watcherData.segmenters.classes;

    const MovementWatchers = movementWatchers ?
      movementWatchers.map((rect) => this.renderWatcher(rect, MOVEMENT)) : null;
    const ClassifierWatchers = classifierWatchers ?
      classifierWatchers.map((rect) => this.renderWatcher(rect, SIMPLE)) : null;

    const SegmenterWatchers = segmenterWatchers ?
      segmenterWatchers.map((rect) => this.renderWatcher(rect, POSITION)) : null;

    const classifierSimpleMenuItems = classifierNames ?
      classifierNames.map(classifier => (
        <MenuItem
          key={classifier}
          value={classifier}
        >
          {classifier}
        </MenuItem>
      )) : null;
    const classifierPositionMenuItems = segmenterNames ?
      segmenterNames.map((classifier) => (
        <MenuItem
          key={classifier}
          value={classifier}
        >
          {classifier}
        </MenuItem>
      )) : null;
    const recognizedSimpleClassMenuItems = classifierClasses ?
      classifierClasses.map((recognizedClass) => (
        <MenuItem
          key={recognizedClass}
          value={recognizedClass}
        >
          {recognizedClass}
        </MenuItem>
      )) : null;
    const recognizedPositionClassMenuItems = segmenterClasses ?
      segmenterClasses.map((recognizedClass) => (
        <MenuItem
          key={recognizedClass}
          value={recognizedClass}
        >
          {recognizedClass}
        </MenuItem>
      )) : null;

    return (
      <ExpansionPanel key={url}>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography variant="subheading">Simulator {url}</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <FormControlLabel
                label="Movement detector"
                control={
                  <Switch
                    checked={data.settings.movementDetector}
                    onChange={(evt) => this.props.onMovementDetectorChange(evt, url)}
                  />
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="title">Simple</Typography>
              <Separator />

              <FormControl fullWidth>
                <InputLabel>Classifier</InputLabel>
                <Dropdown
                  disabled={classifierNames.length === 0}
                  value={emptyStringIfNil(data.settings.simple.classifier)}
                  onChange={(evt) => this.props.onSimpleClassifierChange(evt, url)}
                >
                  {classifierSimpleMenuItems}
                </Dropdown>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Recognized class</InputLabel>
                <Dropdown
                  disabled={classifierNames.length === 0}
                  value={emptyStringIfNil(data.settings.simple.recognizedClass)}
                  onChange={(evt) => this.props.onSimpleRecognizedClassChange(evt, url)}
                >
                  {recognizedSimpleClassMenuItems}
                </Dropdown>
              </FormControl>
              <TextField
                disabled={classifierNames.length === 0}
                value={emptyStringIfNil(data.settings.simple.metadata)}
                onChange={(evt) => this.props.onSimpleMetadataChange(evt, url)}
                label="Metadata"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="title">Position</Typography>
              <Separator />

              <FormControl fullWidth>
                <InputLabel>Classifier</InputLabel>
                <Dropdown
                  disabled={segmenterNames.length === 0}
                  value={emptyStringIfNil(data.settings.position.classifier)}
                  onChange={(evt) => this.props.onPositionClassifierChange(evt, url)}
                >
                  {classifierPositionMenuItems}
                </Dropdown>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Recognized class</InputLabel>
                <Dropdown
                  disabled={segmenterNames.length === 0}
                  value={emptyStringIfNil(data.settings.position.recognizedClass)}
                  onChange={(evt) => this.props.onPositionRecognizedClassChange(evt, url)}
                >
                  {recognizedPositionClassMenuItems}
                </Dropdown>
              </FormControl>
              <TextField
                disabled={segmenterNames.length === 0}
                value={emptyStringIfNil(data.settings.position.metadata)}
                onChange={(evt) => this.props.onPositionMetadataChange(evt, url)}
                label="Metadata"
                fullWidth
              />
            </Grid>
          </Grid>

          <Separator />

          <Typography variant="title">Registered areas by type</Typography>
          <List>
            <ListItem
              button
              onClick={() => this.props.onMovementRegisteredAreasClick(url)}
              disabled={!movementWatchers.length}
            >
              <ListItemText primary="Movement" />
              {data.settings.movementRegisteredAreasOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={data.settings.movementRegisteredAreasOpen} timeout="auto" unmountOnExit>
              <div className={classes.registeredAreaContainer}>
                {MovementWatchers}
              </div>
            </Collapse>
            <Divider />
            <ListItem
              button
              onClick={() => this.props.onSimpleRegisteredAreasClick(url)}
              disabled={!classifierWatchers.length}
            >
              <ListItemText primary="Simple" />
              {data.settings.simpleRegisteredAreasOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={data.settings.simpleRegisteredAreasOpen} timeout="auto" unmountOnExit>
              <div className={classes.registeredAreaContainer}>
                {ClassifierWatchers}
              </div>
            </Collapse>
            <Divider />
            <ListItem
              button
              onClick={() => this.props.onPositionRegisteredAreasClick(url)}
              disabled={!segmenterWatchers.length}
            >
              <ListItemText primary="Position" />
              {data.settings.positionRegisteredAreasOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={data.settings.positionRegisteredAreasOpen} timeout="auto" unmountOnExit>
              <div className={classes.registeredAreaContainer}>
                {SegmenterWatchers}
              </div>
            </Collapse>
          </List>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" onClick={() => this.props.openDevTools(url)}>Dev tools</Button>
          <Button size="small" onClick={() => this.props.onCloseSimulator(url)}>Close simulator</Button>
          <Button size="small" onClick={() => this.props.onFocusSimulator(url)} color="primary">Focus</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

Simulator.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line
  classes: PropTypes.shape({
    clickableCard: PropTypes.string,
    registeredArea: PropTypes.string,
    registeredAreaContainer: PropTypes.string,
    expansionPanelDetails: PropTypes.string
  }).isRequired,
  url: PropTypes.string.isRequired,
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
  onPositionRegisteredAreasClick: PropTypes.func.isRequired,
  openDevTools: PropTypes.func.isRequired,
  handleRegisteredAreaClick: PropTypes.func.isRequired,
  userSimpleClasses: PropTypes.string.isRequired,
  userPositionClasses: PropTypes.string.isRequired
};

export default withStyles(styles)(Simulator);
