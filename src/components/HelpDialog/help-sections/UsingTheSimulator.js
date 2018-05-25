// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

// Custom components
import Separator from '../../Separator';
import InlineCode from '../../InlineCode';

const RegisteredAreas = ({ className }) => (
  <Paper className={className}>
    <Typography variant="title">How to use the simulator?</Typography>
    <Separator divider />

    <Typography variant="subheading">Movement</Typography>
    <Separator />

    <Typography variant="body1">
      Movement is fairly simple and straightforward. You only need to register areas with
      &nbsp;<InlineCode>registerMovement</InlineCode> and activate the movement detector seen in
      &nbsp;the settings image, then move your mouse through the rectangles you registered.
    </Typography>

    <Separator />
    <Typography variant="body1">Note that this functionality is not yet available on the device.</Typography>

    <Separator />

    <Typography variant="subheading">Simple and position classification</Typography>
    <Separator />

    <Typography variant="body1">
      Using <InlineCode>registerSimpleClassifier</InlineCode> or <InlineCode>registerPositionClassifier</InlineCode>
      &nbsp;will make the simulator go through the <InlineCode>classifier</InlineCode>
      &nbsp;property of each registered rectangle and provide them to you in the <strong>Classifier</strong>
      &nbsp;select field in either the <strong>simple</strong> or <strong>position</strong>
      &nbsp;categories.

      <br />
      <br />

      The <strong>Recognized class</strong> select field in both categories
          &nbsp;will show values from 0-10 and 100-110, by default.<br />
      This is by design, as most classifiers only have classes between 0-10, and the values of some QR codes
      &nbsp;we have used are between 100-110.
    </Typography>
    <Separator />

    <Typography variant="subheading">Actually using simple and position classification</Typography>
    <Separator />

    <Typography variant="body1">
      <strong>Left click</strong> for simple classification. <br />
      <strong>Right click</strong> for position classification. <br />
      <br />
    </Typography>
  </Paper>
);

RegisteredAreas.propTypes = {
  className: PropTypes.string.isRequired
};

export default RegisteredAreas;
