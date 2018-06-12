import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

// Component related
import * as Actions from './actions';
import NotificationContent from './NotificationContent';

const styles = (theme) => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  }
});

class Notifications extends React.Component {
  handleClose = () => {
    const { hide } = this.props;
    hide();
  }

  handleExited = () => {
    const { next } = this.props;
    next();
  }

  render() {
    const { open, messageQueue } = this.props;
    const messageInfo = messageQueue[0];

    if (!messageInfo) {
      return null;
    }

    return (
      <Snackbar
        key={messageInfo.key}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        onClose={this.handleClose}
        onExited={this.handleExited}
        autoHideDuration={3000}
      >
        <NotificationContent
          message={messageInfo.message}
          variant={messageInfo.variant}
        />
      </Snackbar>
    );
  }
}

Notifications.propTypes = {
  open: PropTypes.bool.isRequired,
  messageQueue: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    key: PropTypes.number
  })).isRequired,
  hide: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  open: state.notifications.open,
  messageQueue: state.notifications.messageQueue
});

const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(Actions.hide()),
  next: () => dispatch(Actions.next())
});

Notifications = withStyles(styles)(Notifications);
Notifications = connect(mapStateToProps, mapDispatchToProps)(Notifications);

export default Notifications;
