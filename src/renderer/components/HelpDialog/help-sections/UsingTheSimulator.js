// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Custom components
import Separator from '../../Separator';
import InlineCode from '../../InlineCode';

const UsingTheSimulator = ({ className }) => (
  <Paper className={className}>
    <Typography variant="title">How to use the simulator?</Typography>
    <Separator divider />

    <Separator />

    <Typography variant="subheading">Watcher Options</Typography>
    <Separator />

    <Typography variant="body1">
      Using <InlineCode>watchers.add</InlineCode>
      &nbsp;will make the simulator go through the <InlineCode>name</InlineCode>
      &nbsp;property of each registered rectangle and provide them to you in the <strong>Name</strong>
      &nbsp;select field.

      <br />
      <br />

      The <strong>Recognized class</strong> select field in
      &nbsp;will show values from 0-10 and 100-110, by default.<br />
      This is by design, as most (of our) classifiers only have classes between 0-10, and the values of some markers
      &nbsp;we have used are between 100-110. <br />

      This is customizable through the settings.
    </Typography>
    <Separator />

    <Typography variant="subheading">Triggering classification events in the simulator</Typography>
    <Separator />

    <Typography variant="body1">
      <strong>Left click</strong> to trigger classification (<InlineCode>onClassification</InlineCode>)
    </Typography>
  </Paper>
);

UsingTheSimulator.propTypes = {
  className: PropTypes.string.isRequired
};

export default UsingTheSimulator;
