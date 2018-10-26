// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Custom components
import Separator from '../../Separator';

const Tldr = ({ className }) => (
  <Paper className={className}>
    <Typography variant="title">TL;DR</Typography>
    <Separator divider />

    <Typography variant="body1">
      <strong>Left click</strong> - simulate placement of an object. <br />
    </Typography>

    <Typography variant="body1">
      <strong>Opening dev tools</strong> - expand simulator settings, click <i>DEV TOOLS</i>.
    </Typography>

    <Separator />
  </Paper>
);

Tldr.propTypes = {
  className: PropTypes.string.isRequired
};

export default Tldr;
