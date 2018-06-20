// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Custom components
import Separator from '../../Separator';
import InlineCode from '../../InlineCode';

const RegisteredAreas = ({ className }) => (
  <Paper className={className}>
    <Typography variant="title">Registered areas</Typography>
    <Separator divider />

    <Typography variant="body1">
      Provided you used one of the <InlineCode>registerMovement</InlineCode>,
      &nbsp;<InlineCode>registerSimpleClassifier</InlineCode> or
      &nbsp;<InlineCode>registerPositionClassifier</InlineCode> methods
      &nbsp;via <InlineCode>@lampix/core</InlineCode>, one (or more) of the registered area sections will become
      &nbsp;available. Their contents will represent the registered areas that the simulator knows about.
    </Typography>

    <Separator />

    <Typography variant="body1">
      Clicking on them will choose the settings that match the data available
      &nbsp;for that rectangle. The recognized classes may differ.
    </Typography>
  </Paper>
);

RegisteredAreas.propTypes = {
  className: PropTypes.string.isRequired
};

export default RegisteredAreas;
