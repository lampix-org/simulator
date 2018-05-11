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
        <Typography variant="headline">Using Lampix.js 0.x</Typography>
      </Paper>

      <Paper className={classes.paper}>
        <Typography variant="headline">Using the Lampix Simulator</Typography>
        <Separator spacing={20} />

        <Typography variant="title">Loading an application via the address bar</Typography>
        <Separator />

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
