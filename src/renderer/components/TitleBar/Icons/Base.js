import React from 'react';
import PropTypes from 'prop-types';

import grey from '@material-ui/core/colors/grey';
import SvgIcon from '@material-ui/core/SvgIcon';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    '&:hover': {
      backgroundColor: grey[600],
      color: grey[300]
    },
    cursor: 'pointer',
    color: grey[700],
    flexGrow: 1,
    '-webkit-app-region': 'no-drag',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
};

const Base = ({ children, classes }) => (
  <div className={classes.root}>
    <SvgIcon
      color="inherit"
      fontSize="small"
    >
      {children}
    </SvgIcon>
  </div>
);

Base.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    icon: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(Base);
