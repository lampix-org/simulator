import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions
} from 'material-ui/ExpansionPanel';
import { Grid } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';

import Separator from './Separator';

const styles = () => ({
  registeredAreaContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  registeredArea: {
    margin: 10
  },
  listItemText: {
    paddingLeft: 0
  },
  expansionPanelDetails: {
    flexDirection: 'column'
  }
});

class Simulator extends React.Component {
  renderRegisteredArea = (rectangle) => (
    <Card
      key={`${rectangle.posX}/${rectangle.posY}`}
      className={this.props.classes.registeredArea}
    >
      <CardContent>
        <Typography variant="body1">X: {rectangle.posX}</Typography>
        <Typography variant="body1">Y: {rectangle.posY}</Typography>
        <Typography variant="body1">Width: {rectangle.width}</Typography>
        <Typography variant="body1">Height: {rectangle.height}</Typography>
        {
          rectangle.classifier &&
          <Typography variant="body1">Classifier: {rectangle.classifier}</Typography>
        }
      </CardContent>
    </Card>
  );

  render() {
    const { classes, url, simulatorData } = this.props;
    const simulatorRegisteredData = simulatorData.registeredData;
    const movementRectangles = simulatorData.registeredData.movement.rectangles;
    const simpleRectangles = simulatorData.registeredData.simple.rectangles;
    const positionRectangles = simulatorData.registeredData.position.rectangles;
    const simpleClassifiers = simulatorData.registeredData.simple.classifiers;
    const positionClassifiers = simulatorData.registeredData.position.classifiers;
    const simpleClasses = simulatorData.registeredData.simple.classes;
    const positionClasses = simulatorData.registeredData.position.classes;

    const movementRegisteredAreas = (simulatorRegisteredData && movementRectangles) ?
      movementRectangles.map(this.renderRegisteredArea) : null;
    const simpleRegisteredAreas = (simulatorRegisteredData && simpleRectangles) ?
      simpleRectangles.map(this.renderRegisteredArea) : null;

    const positionRegisteredAreas = (simulatorRegisteredData && positionRectangles) ?
      positionRectangles.map(this.renderRegisteredArea) : null;

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
      <ExpansionPanel key={url}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
                    checked={simulatorData.settings.movementDetector}
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
                <Select
                  disabled={simpleClassifiers.length === 0}
                  value={simulatorData.settings.simple.classifier || ''}
                  onChange={(evt) => this.props.onSimpleClassifierChange(evt, url)}
                  input={<Input fullWidth />}
                >
                  {classifierSimpleMenuItems}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Recognized class</InputLabel>
                <Select
                  disabled={simpleClassifiers.length === 0}
                  value={simulatorData.settings.simple.recognizedClass || ''}
                  onChange={(evt) => this.props.onSimpleRecognizedClassChange(evt, url)}
                  input={<Input fullWidth />}
                >
                  {recognizedSimpleClassMenuItems}
                </Select>
              </FormControl>
              <TextField
                disabled={simpleClassifiers.length === 0}
                value={simulatorData.settings.simple.metadata || ''}
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
                <Select
                  disabled={positionClassifiers.length === 0}
                  value={simulatorData.settings.position.classifier || ''}
                  onChange={(evt) => this.props.onPositionClassifierChange(evt, url)}
                  input={<Input fullWidth />}
                >
                  {classifierPositionMenuItems}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Recognized class</InputLabel>
                <Select
                  disabled={positionClassifiers.length === 0}
                  value={simulatorData.settings.position.recognizedClass || ''}
                  onChange={(evt) => this.props.onPositionRecognizedClassChange(evt, url)}
                  input={<Input fullWidth />}
                >
                  {recognizedPositionClassMenuItems}
                </Select>
              </FormControl>
              <TextField
                disabled={positionClassifiers.length === 0}
                value={simulatorData.settings.position.metadata || ''}
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
              disabled={!movementRectangles.length}
            >
              <ListItemText primary="Movement" />
              {simulatorData.settings.movementRegisteredAreasOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={simulatorData.settings.movementRegisteredAreasOpen} timeout="auto" unmountOnExit>
              <div className={classes.registeredAreaContainer}>
                {movementRegisteredAreas}
              </div>
            </Collapse>
            <Divider />
            <ListItem
              button
              onClick={() => this.props.onSimpleRegisteredAreasClick(url)}
              disabled={!simpleRectangles.length}
            >
              <ListItemText primary="Simple" />
              {simulatorData.settings.simpleRegisteredAreasOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={simulatorData.settings.simpleRegisteredAreasOpen} timeout="auto" unmountOnExit>
              <div className={classes.registeredAreaContainer}>
                {simpleRegisteredAreas}
              </div>
            </Collapse>
            <Divider />
            <ListItem
              button
              onClick={() => this.props.onPositionRegisteredAreasClick(url)}
              disabled={!positionRectangles.length}
            >
              <ListItemText primary="Position" />
              {simulatorData.settings.positionRegisteredAreasOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={simulatorData.settings.positionRegisteredAreasOpen} timeout="auto" unmountOnExit>
              <div className={classes.registeredAreaContainer}>
                {positionRegisteredAreas}
              </div>
            </Collapse>
          </List>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" onClick={() => this.props.onCloseSimulator(url)}>Close simulator</Button>
          <Button size="small" onClick={() => this.props.onFocusSimulator(url)} color="primary">Focus</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

Simulator.propTypes = {
  simulatorData: PropTypes.object.isRequired, // eslint-disable-line
  classes: PropTypes.object.isRequired, // eslint-disable-line
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
  onPositionRegisteredAreasClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Simulator);
