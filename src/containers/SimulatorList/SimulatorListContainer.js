import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

// Actions
import { queue } from '../Notifications/actions';
import { notificationTypes } from '../Notifications/constants';

const styles = (theme) => ({
  container: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    minHeight: 'calc(100% - 64px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  })
});

const preventDefault = (e) => e.preventDefault();

class SimulatorListContainer extends React.Component {
  state = { dragging: false };

  componentDidMount() {
    document.ondragover = preventDefault;
    document.ondrop = preventDefault;

    this.container.addEventListener('dragenter', () => {
      this.setState({
        dragging: true
      });
    });

    this.container.addEventListener('dragleave', () => {
      this.setState({
        dragging: false
      });
    });

    this.container.addEventListener('drop', this.handleDrop);
  }

  handleDrop = (event) => {
    const { showMessage } = this.props;
    const { path } = event.dataTransfer.files[0];
    const htmlFile = path.slice(-5) === '.html';

    if (htmlFile) {
      const url = `file://${event.dataTransfer.files[0].path}`;
      window.lampix.loadApp(url);
    } else {
      showMessage('HTML files only', notificationTypes.error);
    }

    this.setState({
      dragging: false
    });
  };

  render() {
    const { classes, children } = this.props;
    const { dragging } = this.state;

    return (
      <div
        className={`${classes.container} ${dragging ? 'dragging' : ''}`}
        ref={(c) => { this.container = c; }}
      >
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={dragging}
          message={<span>Drop the file to load it</span>}
        />

        {children}
      </div>
    );
  }
}

SimulatorListContainer.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string
  }).isRequired,
  children: PropTypes.node.isRequired,
  showMessage: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  showMessage: (message, variant) => dispatch(queue(message, variant))
});

SimulatorListContainer = connect(null, mapDispatchToProps)(SimulatorListContainer);

export default withStyles(styles)(SimulatorListContainer);
