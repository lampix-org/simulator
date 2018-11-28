import React from 'react';

import Base from './Base';

const Close = () => (
  <Base
    fontSize="small"
    onClick={() => window.admin.quit()}
  >
    <path
      d="M20,5.6L18.4,4L12,10.4L5.6,4L4,5.6l6.4,6.4L4,18.4L5.6,20l6.4-6.4l6.4,6.4l1.6-1.6L13.6,12L20,5.6z"
    />
    <path
      style={{ fill: 'none' }}
      d="M0,0h24v24H0V0z"
    />
  </Base>
);

export default Close;
