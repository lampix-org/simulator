import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AutoComplete from '../components/AutoComplete';

import lampixLogo from '../img/logo.png';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logo: {
    width: 30,
    height: 30,
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

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      inputValue: ''
    };

    this.loadApp = this.loadApp.bind(this);
  }

  loadApp = () => {
    if (this.state.selectedItem || this.state.inputValue) {
      this.state.selectedItem ? window.lampix.loadApp(this.state.selectedItem) : window.lampix.loadApp(this.state.inputValue);
    }
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSelectedItemChange = (item) => {
    this.setState({ selectedItem: item });
  }
  render() {
    const { classes } = this.props;
    const { selectedItem, inputValue } = this.state;

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
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(ButtonAppBar);
