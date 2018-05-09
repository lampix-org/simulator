import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Dialog from 'material-ui/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Slide from 'material-ui/transitions/Slide';
import Typography from 'material-ui/Typography';
import AutoComplete from '../components/AutoComplete';

import lampixLogo from '../img/logo.png';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  logo: {
    width: 30,
    height: 30
  },
  toolbar: {
    background: '#222222'
  }
};

const addresses = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8180',
  'http://localhost:8880',
  'http://localhost:8580',
];

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      open: false
    };
  }

  loadApp = () => {
    if (this.state.inputValue) {
      window.lampix.loadApp(this.state.inputValue);
    }
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSelectedItemChange = (item) => {
    this.setState({ inputValue: item });
  }

  openHelp = () => {
    this.setState({ open: true });
  };

  closeHelp = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { inputValue } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <IconButton color="inherit" aria-label="Logo">
              <img src={lampixLogo} className={classes.logo} alt="lampix logo" />
            </IconButton>
            <AutoComplete
              items={addresses}
              inputValue={inputValue}
              onKeyDown={this.handleInputChange}
              onChange={this.handleSelectedItemChange}
              style={{ flexGrow: 1 }}
            />
            <Button onClick={this.loadApp} color="inherit">Load</Button>
            <IconButton className={classes.menuButton} onClick={this.openHelp} color="inherit" aria-label="Menu">
              <Icon>help_outline</Icon>
            </IconButton>
          </Toolbar>
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            transition={Transition}
          >
            <AppBar>
              <Toolbar className={classes.toolbar}>
                <IconButton color="inherit" onClick={this.closeHelp} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Help
                </Typography>
              </Toolbar>
            </AppBar>
          </Dialog>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired // eslint-disable-line
};

export default withStyles(styles)(ButtonAppBar);
