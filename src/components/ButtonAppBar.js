import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Settings from '@material-ui/icons/Settings';
import { UPDATE_URL_LIST } from '../main-process/ipcEvents';

import AutoComplete from './AutoComplete';
import HelpDialog from './HelpDialog';

import SettingsDialog from '../containers/Settings';

const styles = {
  root: {
    flexGrow: 1
  },
  logo: {
    width: 30,
    height: 30
  },
  toolbar: {
    background: '#222222'
  }
};


class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      urlAddresses: [],
      helpDialogOpen: false,
      settingsDialogOpen: false
    };

    window.ipcRenderer.on(UPDATE_URL_LIST, (event, data) => {
      window.Logger.info(`url list received ${data}`);
      this.setState({
        urlAddresses: data
      });
    });
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

  openDialog = (name) => this.setState({
    [`${name}DialogOpen`]: true
  });

  closeDialog = (name) => this.setState({
    [`${name}DialogOpen`]: false
  });

  handleKeyDown = (e, isOpen) => {
    if (!isOpen && e.key === 'Enter') {
      this.loadApp();
    }
  }

  render() {
    const { classes } = this.props;
    const { inputValue } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <AutoComplete
              items={this.state.urlAddresses}
              inputValue={inputValue}
              onSelectedItemChange={this.handleSelectedItemChange}
              onChange={this.handleInputChange}
              onKeyDown={this.handleKeyDown}
              style={{ flexGrow: 1 }}
              onStateChange={this.handleDownshiftStateChange}
            />
            <Button onClick={this.loadApp} color="inherit">Load</Button>
            <IconButton
              onClick={() => this.openDialog('help')}
              color="inherit"
            >
              <HelpOutline />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => this.openDialog('settings')}
            >
              <Settings />
            </IconButton>
          </Toolbar>
          <HelpDialog
            open={this.state.helpDialogOpen}
            handleClose={() => this.closeDialog('help')}
          />

          <SettingsDialog
            open={this.state.settingsDialogOpen}
            handleClose={() => this.closeDialog('settings')}
          />
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired // eslint-disable-line
};

export default withStyles(styles)(ButtonAppBar);
