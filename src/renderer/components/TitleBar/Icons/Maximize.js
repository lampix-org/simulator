import React from 'react';

import Base from './Base';

const Maximize = () => (
  <Base
    fontSize="small"
    onClick={() => window.admin.maximize()}
  >
    <path style={{ fill: 'none' }} d="M0,0h24v24H0V0z" />
    <path
      d="M18.8,4H5.2C4.6,4,4,4.6,4,5.2v13.5C4,19.4,4.6,20,5.2,20h13.5c0.7,0,1.2-0.6,1.2-1.2V5.2C20,4.6,19.4,4,18.8,4 z M18,18H6V6h12V18z" // eslint-disable-line
    />
  </Base>
);

export default Maximize;
