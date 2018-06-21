import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const styles = () => ({
  code: {
    borderRadius: 5,
    border: `1px solid ${grey['300']}`,
    padding: 2,
    fontSize: 12,
    fontFamily: 'monospace',
    display: 'inline-block'
  }
});

const InlineCode = ({ classes, children }) => (
  <code className={classes.code}>{children}</code>
);

InlineCode.propTypes = {
  classes: PropTypes.shape({
    code: PropTypes.string
  }).isRequired,
  children: PropTypes.string.isRequired
};

export default withStyles(styles)(InlineCode);
