import React from 'react';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = () => ({
  dropdown: {
    maxHeight: 200
  }
});

class Dropdown extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <Select
        disabled={this.props.disabled}
        value={this.props.value}
        onChange={(evt) => this.props.onChange(evt, this.props.url)}
        input={<Input fullWidth />}
        MenuProps={{ classes: { paper: classes.dropdown } }}
        style={this.props.style}
      >
        {children}
      </Select>
    );
  }
}

Dropdown.defaultProps = {
  disabled: false,
  style: {}
};

Dropdown.propTypes = {
  classes: PropTypes.shape({
    dropdown: PropTypes.string
  }).isRequired,
  children: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  url: PropTypes.string.isRequired,
  style: PropTypes.shape({})
};

export default withStyles(styles)(Dropdown);
