import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import Divider from 'material-ui/Divider';

const styles = {
  padding: (spacing) => ({
    paddingTop: spacing,
    paddingBottom: spacing
  }),
  margin: (spacing) => ({
    marginTop: spacing,
    marginBottom: spacing
  })
};

const Separator = ({ spacing, divider }) => (
  divider ?
    <Divider style={styles.margin(spacing)} /> :
    <div style={styles.padding(spacing)}></div>
);

Separator.defaultProps = {
  spacing: 10,
  divider: false
};

Separator.propTypes = {
  spacing: PropTypes.number,
  divider: PropTypes.bool
};


export default Separator;
