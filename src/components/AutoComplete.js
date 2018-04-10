import React from 'react';
import PropTypes from 'prop-types';

import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  input: {
    color: 'white'
  },
};

function AutoComplete({ items, onChange }) {
  return (
    <Downshift
      onChange={onChange}
      render={({
                 getInputProps,
                 getItemProps,
                 isOpen,
                 inputValue,
                 selectedItem,
                 highlightedIndex,
               }) => (
        <div
          style={{ flexGrow: 1 }}
        >
          <TextField
            fullWidth
            label="URL address"
            InputLabelProps={{
              style: { color: '#fff' }
            }}
            inputProps={{
              style: { color: 'white' }
            }}
            {...getInputProps()}
          />
          {isOpen ? (
            <Paper style={{ position: 'absolute', padding: '10px' }}>
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
  onChange: () => {
  }
};

AutoComplete.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line
  onChange: PropTypes.func
};

export default withStyles(styles)(AutoComplete);
