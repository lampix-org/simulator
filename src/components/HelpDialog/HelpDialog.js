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

const styles = () => ({
  toolbar: {
    background: '#222222'
  },
  flex: {
    flex: 1
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
  </Dialog>
);

HelpDialog.propTypes = {
  classes: PropTypes.shape({
    toolbar: PropTypes.string,
    flex: PropTypes.string
  }).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(HelpDialog);
