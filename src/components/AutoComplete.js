import React from 'react';
import PropTypes from 'prop-types';

import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  input: {
    color: 'white'
  }
};

class AutoComplete extends React.Component {
  filter(inputValue) {
    const { items } = this.props;
    const result = items.filter((i => !inputValue || i.toLowerCase().includes(inputValue.toLowerCase())));

    return result;
  }

  dropdownOpen(isOpen, filteredItems) {
    return isOpen && filteredItems.length > 0;
  }

  renderSuggestion({
    item,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(item) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={item}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {item}
      </MenuItem>
    );
  }

  renderDropdown({
    filteredItems,
    getItemProps,
    highlightedIndex,
    selectedItem,
    isOpen
  }) {
    const shouldBeOpen = this.dropdownOpen(isOpen, filteredItems);

    if (!shouldBeOpen) {
      return null;
    }

    return (
      <Paper style={{ position: 'absolute', zIndex: 100 }}>
        {
          filteredItems.map((item, index) =>
            this.renderSuggestion({
              item,
              index,
              itemProps: getItemProps({ item }),
              highlightedIndex,
              selectedItem
            }))
        }
      </Paper>
    );
  }

  render() {
    const {
      onChange,
      onKeyDown,
      classes,
      inputValue,
      error,
      helperText,
      onSelectedItemChange
    } = this.props;

    const filteredItems = this.filter(inputValue);

    return (
      <Downshift
        inputValue={inputValue}
        onChange={onSelectedItemChange}
        onStateChange={this.handleDownshiftStateChange}
      >
        {
          ({
            getInputProps,
            getItemProps,
            isOpen,
            selectedItem,
            highlightedIndex
          }) => (
            <div style={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                label="URL address"
                InputLabelProps={{
                  className: classes.input
                }}
                FormHelperTextProps={{
                  className: classes.input
                }}
                inputProps={{
                  className: classes.input
                }}
                value={inputValue}
                error={error}
                helperText={helperText}
                {...getInputProps({
                  onChange,
                  onKeyDown: (event) => onKeyDown(event, this.dropdownOpen(isOpen, filteredItems))
                })}
              />
              {this.renderDropdown({
                filteredItems,
                getItemProps,
                selectedItem,
                highlightedIndex,
                isOpen
              })}
            </div>
          )
        }
      </Downshift>
    );
  }
}

AutoComplete.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    input: PropTypes.string
  }).isRequired,
  inputValue: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.string.isRequired,
  onSelectedItemChange: PropTypes.func.isRequired
};

export default withStyles(styles)(AutoComplete);
