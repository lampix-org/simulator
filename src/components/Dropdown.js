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
      >
        {children}
      </Select>
    );
  }
}

Dropdown.propTypes = {
  classes: PropTypes.shape({
    dropdown: PropTypes.string
  }).isRequired,
  ...Select.propTypes
};

export default withStyles(styles)(Dropdown);
