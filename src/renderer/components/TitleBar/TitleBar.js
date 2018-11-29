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

const TitleBar = ({ classes, noMaximize }) => (
  <div className={classes.titleBar}>
    <WindowControlsContainer noMaximize={noMaximize} />
  </div>
);

TitleBar.defaultProps = {
  noMaximize: false
};

TitleBar.propTypes = {
  classes: PropTypes.shape({
    titleBar: PropTypes.string
  }).isRequired,
  noMaximize: PropTypes.bool
};

export default withStyles(styles)(TitleBar);
