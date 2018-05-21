import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import { ADMIN_UI_READY } from '../../main-process/ipcEvents';

import ButtonAppBar from '../../components/ButtonAppBar';
import SimulatorList from '../SimulatorList';

const styles = (theme) => ({
  simulatorListContainer: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    minHeight: 'calc(100% - 85px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  })
});

class Core extends Component {
  componentDidMount() {
    window.ipcRenderer.send(ADMIN_UI_READY);
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ButtonAppBar />

        <div className={classes.simulatorListContainer}>
          <SimulatorList />
        </div>
      </React.Fragment>
    );
  }
}

Core.propTypes = {
  classes: PropTypes.object.isRequired // eslint-disable-line
};

export default withStyles(styles)(Core);
