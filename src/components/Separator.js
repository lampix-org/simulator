import React from 'react';
import PropTypes from 'prop-types';

const Separator = ({ spacing }) => (
  <div
    style={{
      marginTop: spacing,
      marginBottom: spacing
    }}
  >
  </div>
);

Separator.defaultProps = {
  spacing: 10
};

Separator.propTypes = {
  spacing: PropTypes.number
};

export default Separator;
