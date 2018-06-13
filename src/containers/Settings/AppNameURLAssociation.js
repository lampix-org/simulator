import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import Close from '@material-ui/icons/Close';

const styles = (theme) => ({
  iconSmall: {
    fontSize: 20
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class AppNameURLAssociation extends React.PureComponent {
  state = {
    editingDisabled: true
  };

  enableEditing = () => this.setState({
    editingDisabled: false
  });

  saveChanges = () => {
    const { onSave } = this.props;

    this.setState({
      editingDisabled: true
    }, onSave);
  }

  render() {
    const {
      name,
      url,
      onNameChange,
      onURLChange,
      onRemove,
      textFieldClassName,
      classes
    } = this.props;

    const { editingDisabled } = this.state;

    return (
      <div>
        <TextField
          label="Saved App Name"
          type="text"
          margin="normal"
          value={name}
          disabled={editingDisabled}
          onChange={onNameChange}
          className={textFieldClassName}
        />

        <TextField
          label="Saved App URL"
          type="text"
          margin="normal"
          value={url}
          disabled={editingDisabled}
          onChange={onURLChange}
          className={textFieldClassName}
        />

        {
          editingDisabled ?
            <Button
              variant="contained"
              color="white"
              size="small"
              onClick={this.enableEditing}
            >
              <Edit className={classes.iconSmall} />
            </Button> :
            <Button
              variant="contained"
              color="white"
              size="small"
              onClick={this.saveChanges}
            >
              <Save className={classes.iconSmall} />
            </Button>
        }

        <Button
          className={classes.button}
          variant="contained"
          color="white"
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
  onNameChange: PropTypes.func.isRequired,
  onURLChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  textFieldClassName: PropTypes.string,
  classes: PropTypes.shape({
    iconSmall: PropTypes.string,
    button: PropTypes.string
  }).isRequired
};

AppNameURLAssociation = withStyles(styles)(AppNameURLAssociation);

export default AppNameURLAssociation;
