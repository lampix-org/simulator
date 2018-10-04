// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Custom components
import Separator from '../../Separator';

const DevTools = ({ className }) => (
  <Paper className={className}>
    <Typography variant="title">Developer tools</Typography>
    <Separator divider />

    <Typography variant="body1">
      Developer tools are the same ones present in Chrome, so you may feel
      &nbsp;right at home using them. If not, the Chrome team has excellent documentation
      &nbsp;on this topic.
    </Typography>
    <Separator />

    <Typography variant="body1">
      Each simulator will have its own developer tools set.<br />
      To use them, expand the simulator settings and click the <i>DEV TOOLS</i> button.
    </Typography>
  </Paper>
);

DevTools.propTypes = {
  className: PropTypes.string.isRequired
};

export default DevTools;
