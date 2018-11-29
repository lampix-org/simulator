import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Core from '../Core';
import Simulation from '../Simulation';

const AppRouter = () => (
  <Router>
    <div style={{ height: '100%' }}>
      <Route path="/" exact component={Core} />
      <Route path="/simulation/" component={Simulation} />
    </div>
  </Router>
);

export default AppRouter;
