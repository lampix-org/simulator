import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import ButtonAppBar from '../../components/ButtonAppBar';
import SimulatorList from '../SimulatorList';

const styles = {
  rootDiv: {
    backgroundColor: '#fafafa',
    height: '100vh',
    width: '100vw'
  },
};

class Core extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.rootDiv}>
        <ButtonAppBar />
        <SimulatorList />
      </div>
    );
  }
}

Core.propTypes = {
  classes: PropTypes.object.isRequired // eslint-disable-line
};

export default withStyles(styles)(Core);
