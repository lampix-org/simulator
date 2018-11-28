import React from 'react';

import Base from './Base';

const Minimize = () => (
  <Base fontSize="small">
    <path
      d="M20,19H4v-2h16V19z"
    />
    <path
      style={{ fill: 'none' }}
      d="M0,0h24v24H0V0z"
    />
  </Base>
);

export default Minimize;
