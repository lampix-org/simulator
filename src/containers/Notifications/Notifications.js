import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import Snackbar from 'material-ui/Snackbar';

// Component related
import * as Actions from './actions';

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
        message={<span>{messageInfo.message}</span>}
        autoHideDuration={3000}
      />
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

Notifications = connect(mapStateToProps, mapDispatchToProps)(Notifications);

export default Notifications;
