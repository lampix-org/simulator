import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import SnackbarContent from '@material-ui/core/SnackbarContent';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

// Utils
import noop from 'lodash.noop';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = (theme) => ({
  info: {
    backgroundColor: grey[900]
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
});

class NotificationContent extends React.PureComponent {
  render() {
    const {
      onClose,
      variant,
      message,
      classes
    } = this.props;

    const VariantIcon = variantIcon[variant];

    return (
      <SnackbarContent
        className={classes[variant]}
        onClose={onClose}
        message={
          <div className={classes.message}>
            <VariantIcon className={`${classes.icon} ${classes.iconVariant}`} />
            {message}
          </div>
        }
      />
    );
  }
}

NotificationContent.defaultProps = {
  variant: 'info',
  onClose: noop
};

NotificationContent.propTypes = {
  classes: PropTypes.shape({
    error: PropTypes.string,
    warning: PropTypes.string,
    info: PropTypes.string,
    success: PropTypes.string,
    icon: PropTypes.string,
    iconVariant: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    'info',
    'success',
    'error',
    'warning'
  ])
};

NotificationContent = withStyles(styles)(NotificationContent);

export default NotificationContent;
