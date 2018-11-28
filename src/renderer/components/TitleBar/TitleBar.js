import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import WindowControlsContainer from './WindowControlsContainer';

const styles = () => ({
  titleBar: {
    height: 25,
    width: '100%',
    backgroundColor: grey[800],
    '-webkit-app-region': 'drag',
    display: 'flex'
  }
});

const TitleBar = ({ classes }) => (
  <div className={classes.titleBar}>
    <WindowControlsContainer />
  </div>
);

TitleBar.propTypes = {
  classes: PropTypes.shape({
    titleBar: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(TitleBar);
