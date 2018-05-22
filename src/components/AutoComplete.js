import React from 'react';
import PropTypes from 'prop-types';

import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import noop from 'lodash.noop';

const styles = {
  input: {
    color: 'white'
  }
};

function AutoComplete({
  items,
  onChange,
  onKeyDown,
  classes,
  inputValue,
  error,
  helperText,
  onSelectedItemChange
}) {
  return (
    <Downshift
      inputValue={inputValue}
      onChange={onSelectedItemChange}
      render={({
        getInputProps,
        getItemProps,
        isOpen,
        selectedItem,
        highlightedIndex
      }) => (
        <div
          style={{ flexGrow: 1 }}
        >
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
              onKeyDown: (event) => onKeyDown(event, isOpen)
            })}
          />
          {isOpen ? (
            <Paper style={{ position: 'absolute', padding: '10px', zIndex: 100 }}>
              {items
                .filter(i =>
                  !inputValue ||
                  i.toLowerCase().includes(inputValue.toLowerCase()))
                .map((item, index) => (
                  <Typography
                    {...getItemProps({ item })}
                    key={item}
                    style={{
                      color: highlightedIndex === index ? 'red' : '#0d0d0d',
                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                    }}
                  >
                    {item}
                  </Typography>
                ))}
            </Paper>
          ) : null}
        </div>
      )}
    />
  );
}

AutoComplete.defaultProps = {
  onChange: noop,
  onKeyDown: noop,
  helperText: '',
  onSelectedItemChange: noop
};

AutoComplete.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  classes: PropTypes.object.isRequired, // eslint-disable-line
  inputValue: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.string,
  onSelectedItemChange: PropTypes.func
};

export default withStyles(styles)(AutoComplete);
