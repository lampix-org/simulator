// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

// Custom components
import Separator from '../../Separator';

const Tldr = ({ className }) => (
  <Paper className={className}>
    <Typography variant="title">TL;DR</Typography>
    <Separator divider />

    <Typography variant="body1">
      <strong>Left click</strong> for simple classification. <br />
      <strong>Right click</strong> for position classification. <br />
    </Typography>

    <Separator />

    <Typography variant="body1">
      <strong>Dev tools</strong>: expand simulator settings, click <i>DEV TOOLS</i>.
    </Typography>
  </Paper>
);

Tldr.propTypes = {
  className: PropTypes.string.isRequired
};

export default Tldr;
