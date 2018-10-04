// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Custom components
import Separator from '../../Separator';
import InlineCode from '../../InlineCode';

const WhatIsASimulator = ({ className }) => (
  <Paper className={className}>
    <Typography variant="title">What is a simulator?</Typography>
    <Separator divider />

    <Typography variant="body1">
      A simulator is a window that renders the specified web application. <br />
      It provides handlers for the API calls in <InlineCode>lampix.js</InlineCode> to allow developers to
      work out the logic of their application on their own computer before trying it out on
      a Lampix device.

      <br />
      <br />

      In short, a simulator is one of the environments where
      &nbsp;<InlineCode>lampix.js</InlineCode> can be used, the other one
      being a Lampix device.
    </Typography>
  </Paper>
);

WhatIsASimulator.propTypes = {
  className: PropTypes.string.isRequired
};

export default WhatIsASimulator;
