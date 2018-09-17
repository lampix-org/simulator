// React
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// Utils
import get from 'lodash.get';

// Custom components
import Separator from '../../components/Separator';
import AppNameURLAssociation from './AppNameURLAssociation';

// IPC Events
import { APP_CONFIG } from '../../main-process/ipcEvents';

// Actions
import { queue } from '../Notifications/actions';
import { notificationTypes } from '../Notifications/constants';

const styles = (theme) => ({
  container: theme.mixins.gutters({
    paddingTop: 80, // 64 to account for the app bar, 16 for inner spacing
    paddingBottom: 16
  }),
  toolbar: {
    background: grey[900]
  },
  paper: theme.mixins.gutters({
    marginBottom: theme.spacing.unit * 2,
    paddingTop: 16,
    paddingBottom: 16
  }),
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit
  }
});

const scalefactorProps = {
  step: 0.1,
  min: 1
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Settings extends React.Component {
  state = {
    association: {
      name: '',
      url: ''
    },
    scaleFactor: '',
    endpoint: '',
    token: '',
    simpleClasses: '',
    positionClasses: ''
  };

  componentDidMount() {
    window.ipcRenderer.on(APP_CONFIG, (event, settings) => {
      const {
        simulator: {
          coordinateConversion: {
            scaleFactor
          }
        },
        pix,
        userSimpleClasses,
        userPositionClasses
      } = settings;

      this.setState({
        scaleFactor,
        endpoint: pix.endpoint,
        token: pix.token,
        classifierNames: userSimpleClasses && userSimpleClasses.length ? userSimpleClasses.join('\n') : '',
        segmenterNames: userPositionClasses && userPositionClasses.length ? userPositionClasses.join('\n') : ''
      });
    });
  }

  addNewAssociation = () => {
    const { association: { name, url } } = this.state;

    this.saveAssociation(name, url);
    this.resetNewAssociationInputs();
  }

  resetNewAssociationInputs = () => {
    this.setState({
      association: {
        name: '',
        url: ''
      }
    });
  }

  updateNewAssociation = (event, type) => {
    this.setState({
      ...this.state,
      association: {
        url: type === 'url' ? event.target.value : this.state.association.url,
        name: type === 'name' ? event.target.value : this.state.association.name
      }
    });
  }

  removeAssociation = (name) => {
    window.lampix.removeAssociation(name);
  };

  saveAssociation = (name, url) => {
    window.lampix.addAssociation(name, url);
  }

  updateScaleFactor = (event) => {
    this.setState({
      ...this.state,
      scaleFactor: event.target.value.match(/[1-9]*[,.]{0,1}[1-9]{0,2}/)[0]
    });
  }

  saveScaleFactor = () => {
    window.lampix.saveScaleFactor(this.state.scaleFactor);
  }

  updatePix = (label, event) => {
    this.setState({
      ...this.state,
      [label]: event.target.value
    });
  }

  savePix = () => {
    const { endpoint, token } = this.state;
    window.lampix.savePix({ endpoint, token });
  }

  areSettingsValid = (settings) => settings.findIndex(element => element === '') === -1

  saveSettings = (event, callback, message, settings) => {
    const { showMessage } = this.props;
    if ((event.key === 'Enter' || !event.key)) {
      if (this.areSettingsValid(settings)) {
        event.preventDefault();
        callback.call(this);
        showMessage(`${message} saved`, notificationTypes.success);
      } else {
        showMessage(`${message} cannot be empty`, notificationTypes.error);
      }
    }
  }

  updateUserSimpleClasses = (event) => {
    this.setState({
      ...this.state,
      simpleClasses: event.target.value
    });
  }

  saveUserSimpleClasses = () => {
    const { simpleClasses } = this.state;
    window.lampix.saveUserSimpleClasses(simpleClasses.trim().split('\n'));
  }

  resetUserSimpleClasses = () => {
    this.setState({
      ...this.state,
      simpleClasses: ''
    }, () => {
      const { simpleClasses } = this.state;
      window.lampix.saveUserSimpleClasses(simpleClasses);
    });
  }

  updateUserPositionClasses = (event) => {
    this.setState({
      ...this.state,
      positionClasses: event.target.value
    });
  }
  saveUserPositionClasses = () => {
    const { positionClasses } = this.state;
    window.lampix.saveUserPositionClasses(positionClasses.trim().split('\n'));
  }

  resetUserPositionClasses = () => {
    this.setState({
      ...this.state,
      positionClasses: ''
    }, () => {
      const { positionClasses } = this.state;
      window.lampix.saveUserPositionClasses(positionClasses);
    });
  }

  render() {
    const {
      classes,
      open,
      handleClose
    } = this.props;

    const nameToURLAssociations = get(this.state, 'settings.simulator.appSwitcher.nameToURLAssociations', {});

    return (
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
            >
              Settings
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.container}>
          <Paper className={classes.paper}>
            <Typography variant="title">
              Associate URLs with app names
            </Typography>
            <Typography variant="subheading">
              This allows loading apps using their name instead of the whole URL
            </Typography>

            <Separator />

            <TextField
              label="App name"
              type="text"
              className={classes.textField}
              margin="normal"
              onChange={(e) => this.updateNewAssociation(e, 'name')}
              onKeyPress={
                (e) => this.saveSettings(
                  e, this.addNewAssociation, 'Name and URL',
                  [this.state.association.name, this.state.association.url]
                )
              }
              value={this.state.association.name}
            />

            <TextField
              label="App URL"
              type="text"
              className={classes.textField}
              margin="normal"
              onChange={(e) => this.updateNewAssociation(e, 'url')}
              onKeyPress={
                (e) => this.saveSettings(
                  e, this.addNewAssociation, 'Name and URL',
                  [this.state.association.name, this.state.association.url]
                )
              }
              value={this.state.association.url}
            />

            <Button
              className={classes.button}
              variant="contained"
              color="default"
              size="small"
              onClick={
                (e) => this.saveSettings(
                  e, this.addNewAssociation, 'Name and URL',
                  [this.state.association.name, this.state.association.url]
                )
              }
            >
              Add
            </Button>

            {
              Object.keys(nameToURLAssociations).map((name, i) => (
                <AppNameURLAssociation
                  key={i}
                  name={name}
                  url={nameToURLAssociations[name]}
                  onRemove={() => this.removeAssociation(name)}
                  textFieldClassName={classes.textField}
                />
              ))
            }
          </Paper>

          <Paper className={classes.paper}>
            <Typography variant="title">
              Set the scale factor for coordinates
            </Typography>
            <Typography variant="subheading">
              This allows changing the scale factor for the coordinates (x, y, width, height)
            </Typography>

            <Separator />

            <TextField
              label="Scale factor"
              type="number"
              className={classes.textField}
              margin="normal"
              value={this.state.scaleFactor}
              onChange={this.updateScaleFactor}
              inputProps={scalefactorProps}
              onKeyPress={(e) => this.saveSettings(e, this.saveScaleFactor, 'Scale factor', [this.state.scaleFactor])}
            />

            <Button
              className={classes.button}
              variant="contained"
              color="default"
              size="small"
              onClick={(e) => this.saveSettings(e, this.saveScaleFactor, 'Scale factor', [this.state.scaleFactor])}
            >
              Save
            </Button>
          </Paper>

          <Paper className={classes.paper}>
            <Typography variant="title">
              Set pix endpoint and token
            </Typography>

            <Separator />

            <TextField
              label="Endpoint"
              type="text"
              className={classes.textField}
              margin="normal"
              value={this.state.endpoint}
              onChange={(e) => this.updatePix('endpoint', e)}
              onKeyPress={
                (e) => this.saveSettings(
                  e, this.savePix, 'Pix endpoint and token',
                  [this.state.endpoint, this.state.token]
                )
              }
            />

            <TextField
              label="Token"
              type="text"
              className={classes.textField}
              margin="normal"
              value={this.state.token}
              onChange={(e) => this.updatePix('token', e)}
              onKeyPress={
                (e) => this.saveSettings(
                  e, this.savePix, 'Pix endpoint and token',
                  [this.state.endpoint, this.state.token]
                )
              }
            />

            <Button
              className={classes.button}
              variant="contained"
              color="default"
              size="small"
              onClick={
                (e) => this.saveSettings(
                  e, this.savePix, 'Pix endpoint and token',
                  [this.state.endpoint, this.state.token]
                )
              }
            >
              Save
            </Button>
          </Paper>

          <Paper className={classes.paper}>
            <Typography variant="title">
              Set custom classes
            </Typography>
            <Typography variant="subheading">
              This allows setting custom values in the recognized class dropdown for simple and position classifiers
            </Typography>
            <Typography variant="body1">
              Please put each custom class on a separate line
            </Typography>

            <Separator />
            <TextField
              label="Simple classes"
              multiline
              rows="2"
              rowsMax="4"
              className={classes.textField}
              margin="normal"
              value={this.state.simpleClasses}
              onChange={this.updateUserSimpleClasses}
            />

            <Button
              className={classes.button}
              variant="contained"
              color="default"
              size="small"
              onClick={(e) => this.saveSettings(
                e, this.saveUserSimpleClasses, 'Simple classes',
                this.state.simpleClasses.trim().split('\n')
              )
              }
            >
              Save
            </Button>

            <Button
              className={classes.button}
              variant="contained"
              color="default"
              size="small"
              onClick={() => this.resetUserSimpleClasses()}
            >
              Reset
            </Button>

            <Separator />
            <TextField
              label="Position classes"
              multiline
              rows="2"
              rowsMax="4"
              className={classes.textField}
              margin="normal"
              value={this.state.positionClasses}
              onChange={this.updateUserPositionClasses}
            />

            <Button
              className={classes.button}
              variant="contained"
              color="default"
              size="small"
              onClick={(e) => this.saveSettings(
                e, this.saveUserPositionClasses, 'Position classes',
                this.state.positionClasses.trim().split('\n')
              )
              }
            >
              Save
            </Button>

            <Button
              className={classes.button}
              variant="contained"
              color="default"
              size="small"
              onClick={() => this.resetUserPositionClasses()}
            >
              Reset
            </Button>
          </Paper>
        </div>
      </Dialog>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.shape({
    toolbar: PropTypes.string,
    container: PropTypes.string,
    paper: PropTypes.string,
    textField: PropTypes.string
  }).isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  showMessage: (message, variant) => dispatch(queue(message, variant))
});

Settings = connect(null, mapDispatchToProps)(Settings);

export default withStyles(styles)(Settings);
