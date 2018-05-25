// React
import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';
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
import InlineCode from '../InlineCode';

// Help sections
import Tldr from './help-sections/Tldr';
import WhatIsASimulator from './help-sections/WhatIsASimulator';
import LoadingAnApp from './help-sections/LoadingAnApp';
import SimulatorSettings from './help-sections/SimulatorSettings';

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

      <Paper className={classes.paper}>
        <Typography variant="title">Registered areas</Typography>
        <Separator divider />

        <Typography variant="body1">
          Provided you used one of the <InlineCode>registerMovement</InlineCode>,
          &nbsp;<InlineCode>registerSimpleClassifier</InlineCode> or
          &nbsp;<InlineCode>registerPositionClassifier</InlineCode> methods
          &nbsp;via <InlineCode>@lampix/core</InlineCode>, one (or more) of the registered area sections will become
          &nbsp;available. Their contents will represent the registered areas that the simulator knows about.
        </Typography>
      </Paper>

      <Paper className={classes.paper}>
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
