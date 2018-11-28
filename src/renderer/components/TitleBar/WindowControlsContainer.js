import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Close from './Icons/Close';
import Minimize from './Icons/Minimize';
import Maximize from './Icons/Maximize';

const styles = {
  controls: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    marginLeft: 'auto',
    width: '7%'
  }
};

const WindowControlsContainer = ({ classes }) => (
  <div className={classes.controls}>
    <Minimize />
    <Maximize />
    <Close />
  </div>
);

WindowControlsContainer.propTypes = {
  classes: PropTypes.shape({
    controls: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(WindowControlsContainer);
