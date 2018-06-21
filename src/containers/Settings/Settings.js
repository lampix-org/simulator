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
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// Utils
import get from 'lodash.get';

// Custom components
import Separator from '../../components/Separator';
import AppNameURLAssociation from './AppNameURLAssociation';

// IPC Events
import {
  APP_CONFIG
} from '../../main-process/ipcEvents';

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
    token: ''
  };

  componentDidMount() {
    window.ipcRenderer.on(APP_CONFIG, (event, settings) => {
      this.setState({ settings });
      this.state.scaleFactor = this.state.settings.simulator.coordinateConversion.scaleFactor;
      this.state.endpoint = this.state.settings.pix.endpoint;
      this.state.token = this.state.settings.pix.token;
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

  updateNewAssociationName = (event) => {
    this.setState({
      ...this.state,
      association: {
        url: this.state.association.url,
        name: event.target.value
      }
    });
  }

  updateNewAssociationURL = (event) => {
    this.setState({
      ...this.state,
      association: {
        url: event.target.value,
        name: this.state.association.name
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
              onChange={this.updateNewAssociationName}
              value={this.state.association.name}
            />

            <TextField
              label="App URL"
              type="text"
              className={classes.textField}
              margin="normal"
              onChange={this.updateNewAssociationURL}
              value={this.state.association.url}
            />

            <Button
              variant="contained"
              color="default"
              size="small"
              onClick={this.addNewAssociation}
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
            />

            <Button
              variant="contained"
              color="default"
              size="small"
              onClick={this.saveScaleFactor}
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
            />

            <TextField
              label="Token"
              type="text"
              className={classes.textField}
              margin="normal"
              value={this.state.token}
              onChange={(e) => this.updatePix('token', e)}
            />

            <Button
              variant="contained"
              color="default"
              size="small"
              onClick={this.savePix}
            >
              Save
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
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(Settings);
