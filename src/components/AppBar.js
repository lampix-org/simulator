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

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" aria-label="Logo">
            <img src={lampixLogo} className={classes.logo} alt="lampix logo" />
          </IconButton>
          <AutoComplete
            items={addresses}
            onChange={selectedItem => console.log(selectedItem)}
            style={{ flexGrow: 1 }}
          />
          <Button color="inherit">Load</Button>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);
