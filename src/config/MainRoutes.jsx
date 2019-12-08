import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../components/Landing';
import Dashboard from '../components/Dashboard';

export default (props) => (
  <Switch>
    <Route exact path='/'>
      <Landing
        signup={props.signup}
        setCurrentUser={props.setCurrentUser}
      />
    </Route>
    <Route path='/dashboard'>
      <Dashboard />
    </Route>
  </Switch>
);
