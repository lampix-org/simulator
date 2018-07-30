import React from 'react';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  dropdown: {
    maxHeight: 200
  }
});

class Dropdown extends React.Component {
  render() {
    const {
      classes,
      children,
      style,
      ...other
    } = this.props;
    return (
      <Select
        MenuProps={{ classes: { paper: classes.dropdown } }}
        {...other}
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
