import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { UPDATE_URL_LIST, INVALID_URL } from '../main-process/ipcEvents';

import AutoComplete from '../components/AutoComplete';
import HelpDialog from '../components/HelpDialog';

const styles = {
  root: {
    flexGrow: 1
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
    background: '#222222',
    height: 85
  }
};


class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      open: false,
      error: false,
      urlAddresses: [],
      helperText: ''
    };

    window.ipcRenderer.on(UPDATE_URL_LIST, (event, data) => {
      window.Logger.info(`url list received ${data}`);
      this.setState({
        urlAddresses: data
      });
    });
    window.ipcRenderer.on(INVALID_URL, (event, data) => {
      this.setState({
        error: true,
        helperText: data
      });
    });
  }

  loadApp = () => {
    if (this.state.inputValue) {
      window.lampix.loadApp(this.state.inputValue);
    }
    this.setState({
      error: false,
      helperText: ''
    });
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

  handleKeyDown = (e, isOpen) => {
    if (!isOpen && e.key === 'Enter') {
      this.loadApp();
    }
  }

  render() {
    const { classes } = this.props;
    const { inputValue, error, helperText } = this.state;

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
              error={error}
              style={{ flexGrow: 1 }}
              helperText={helperText}
            />
            <Button onClick={this.loadApp} color="inherit">Load</Button>
            <IconButton className={classes.menuButton} onClick={this.openHelp} color="inherit" aria-label="Menu">
              <Icon>help_outline</Icon>
            </IconButton>
          </Toolbar>
          <HelpDialog
            open={this.state.open}
            handleClose={this.closeHelp}
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
