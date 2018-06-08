// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

// Help sections
import Tldr from './help-sections/Tldr';
import WhatIsASimulator from './help-sections/WhatIsASimulator';
import LoadingAnApp from './help-sections/LoadingAnApp';
import SimulatorSettings from './help-sections/SimulatorSettings';
import RegisteredAreas from './help-sections/RegisteredAreas';
import UsingTheSimulator from './help-sections/UsingTheSimulator';
import DevTools from './help-sections/DevTools';

const styles = (theme) => ({
  container: theme.mixins.gutters({
    paddingTop: 80, // 64 to account for the app bar, 16 for inner spacing
    paddingBottom: 16
  }),
  toolbar: {
    background: grey['900']
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
    maxWidth: '100%',
    border: `1px solid ${grey['100']}`
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
    TransitionComponent={Transition}
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
      <Tldr className={classes.paper} />
      <WhatIsASimulator className={classes.paper} />
      <LoadingAnApp
        className={classes.paper}
        imageClass={classes.image}
      />
      <SimulatorSettings
        className={classes.paper}
        imageClass={classes.image}
      />
      <RegisteredAreas className={classes.paper} />
      <UsingTheSimulator className={classes.paper} />
      <DevTools className={classes.paper} />
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
