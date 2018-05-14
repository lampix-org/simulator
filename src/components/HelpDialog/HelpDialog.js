// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from 'material-ui/styles';
import Dialog from 'material-ui/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

// Custom components
import Separator from '../Separator';

// Assets
import simulatorAddressBar from '../../assets/images/simulator-load-bar.png';
import simulatorList from '../../assets/images/simulator-list.png';

const styles = (theme) => ({
  container: theme.mixins.gutters({
    paddingTop: 80, // 64 to account for the app bar, 16 for inner spacing
    paddingBottom: 16
  }),
  toolbar: {
    background: '#222222'
  },
  flex: {
    flex: 1
  },
  paper: theme.mixins.gutters({
    marginBottom: theme.spacing.unit * 2,
    paddingTop: 16,
    paddingBottom: 16
  }),
  image: {
    maxWidth: '100%'
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const HelpDialog = ({
  classes,
  open,
  handleClose
}) => (
  <Dialog
    fullScreen
    open={open}
    transition={Transition}
  >
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={handleClose}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="title"
          color="inherit"
          className={classes.flex}
        >
          Help
        </Typography>
      </Toolbar>
    </AppBar>

    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="title">What is a simulator?</Typography>
        <Separator divider />

        <Typography variant="body1">
          A simulator is a window that renders the specified web application. <br />
          It provides handlers for the API calls in <code>lampix.js</code> to allow developers to
          work out the logic of their application on their own computer before trying it out on
          a Lampix device.

          <br />
          <br />

          In short, a simulator is one of the environments where <code>lampix.js</code> can be used, the other one
          being a Lampix device.
        </Typography>
      </Paper>

      <Paper className={classes.paper}>
        <Typography variant="title">Loading an application via the address bar</Typography>
        <Separator divider />

        <img
          className={classes.image}
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
          <li><code>file://home/username/path/to/index.html</code></li>
          <li><code>http://localhost:1313</code></li>
          <li><code>https://some.remotesite.com</code></li>
        </ul>
      </Paper>

      <Paper className={classes.paper}>
        <Typography variant="title">Changing simulator settings</Typography>
        <Separator divider />

        <Typography variant="body1">
          We will refer to the window opened by pressing the load button as a <i>simulator</i>. <br />
          If we had three simulators open at the same time, the list would look like this:
        </Typography>

        <Separator />
        <img
          className={classes.image}
          src={simulatorList}
          alt="Simulator list"
        />
        <Separator />
      </Paper>
    </div>
  </Dialog>
);

HelpDialog.propTypes = {
  classes: PropTypes.shape({
    toolbar: PropTypes.string,
    flex: PropTypes.string,
    container: PropTypes.string,
    paper: PropTypes.string
  }).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(HelpDialog);
