import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { UPDATE_URL_LIST } from '../main-process/ipcEvents';

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
    background: '#222222'
  }
};


class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      open: false,
      urlAddresses: []
    };

    window.ipcRenderer.on(UPDATE_URL_LIST, (event, data) => {
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

  openHelp = () => {
    this.setState({ open: true });
  };

  closeHelp = () => {
    this.setState({ open: false });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter' && this.state.inputValue) {
      window.lampix.loadApp(this.state.inputValue);
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
