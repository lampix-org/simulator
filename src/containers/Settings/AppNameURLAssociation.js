import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';

const styles = () => ({
  iconSmall: {
    fontSize: 20
  }
});

class AppNameURLAssociation extends React.PureComponent {
  render() {
    const {
      name,
      url,
      onRemove,
      textFieldClassName,
      classes
    } = this.props;

    return (
      <div>
        <TextField
          label="Saved App Name"
          type="text"
          margin="normal"
          value={name}
          disabled
          className={textFieldClassName}
        />

        <TextField
          label="Saved App URL"
          type="text"
          margin="normal"
          value={url}
          disabled
          className={textFieldClassName}
        />

        <Button
          variant="contained"
          size="small"
          onClick={onRemove}
        >
          <Close className={classes.iconSmall} />
        </Button>
      </div>
    );
  }
}

AppNameURLAssociation.defaultProps = {
  textFieldClassName: ''
};

AppNameURLAssociation.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  textFieldClassName: PropTypes.string,
  classes: PropTypes.shape({
    iconSmall: PropTypes.string,
    button: PropTypes.string
  }).isRequired
};

AppNameURLAssociation = withStyles(styles)(AppNameURLAssociation);

export default AppNameURLAssociation;
