// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Custom components
import Separator from '../../Separator';

// Assets
import simulatorList from '../../../assets/images/simulator-list.png';
import simulatorSettings from '../../../assets/images/simulator-settings.png';

const SimulatorSettings = ({ className, imageClass }) => (
  <Paper className={className}>
    <Typography variant="title">Simulator settings</Typography>
    <Separator divider />

    <Typography variant="body1">
      If we had three simulators open at the same time, the list would look like this:
    </Typography>

    <Separator />
    <img
      className={imageClass}
      src={simulatorList}
      alt="Simulator list"
    />
    <Separator />

    <Typography variant="body1">
      Expanding a simulator opens up the available settings, as seen in the following image:
    </Typography>

    <Separator />
    <img
      className={imageClass}
      src={simulatorSettings}
      alt="Simulator settings"
    />
    <Separator />

    <Typography variant="body1">
      <strong>
        Note how <i>classifier</i>, <i>recognized class</i> and <i>metadata</i>
        &nbsp;are available in two categories: <i>simple</i> and <i>position</i>.
      </strong>
      <br />

      These represent the types of classification Lampix can do. <br /><br />

      Simple classification will inform you whether a recognized object has appeared in a specified area,
      &nbsp;and what class the object belongs to, and it expects to have only one object in that area.<br />

      Position classification, on the other hand, works in two steps.

      First, it provides the outline of the detected object(s) as a preliminary
      &nbsp;step before classification is complete.

      Then, when classification is done (per object), the device returns an array
      &nbsp;of JSON objects describing what the device detected and recognized.
      These JSON objects provide information about the outline (and therefore position)
      &nbsp;and the recognized class of the detected objects.
    </Typography>
    <Separator />
  </Paper>
);

SimulatorSettings.propTypes = {
  className: PropTypes.string.isRequired,
  imageClass: PropTypes.string.isRequired
};

export default SimulatorSettings;
