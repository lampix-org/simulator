// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

// Custom components
import Separator from '../../Separator';
import InlineCode from '../../InlineCode';

// Assets
import simulatorAddressBar from '../../../assets/images/simulator-load-bar.png';

const LoadingAnApp = ({ className, imageClass }) => (
  <Paper className={className}>
    <Typography variant="title">Loading an application via the address bar</Typography>
    <Separator divider />

    <img
      className={imageClass}
      src={simulatorAddressBar}
      alt="Simulator address bar"
    />

    <Separator />
    <Typography variant="body1">
      You only have to enter the URL address for a web application and press the load button.
          Addresses can be local or remote. <br />
      Example addresses that will work, provided they point to a web application: <br />
    </Typography>

    <ul>
      <li><InlineCode>file://home/username/path/to/index.html</InlineCode></li>
      <li><InlineCode>http://localhost:1313</InlineCode></li>
      <li><InlineCode>https://some.remotesite.com</InlineCode></li>
    </ul>
  </Paper>
);

LoadingAnApp.propTypes = {
  className: PropTypes.string.isRequired,
  imageClass: PropTypes.string.isRequired
};

export default LoadingAnApp;
