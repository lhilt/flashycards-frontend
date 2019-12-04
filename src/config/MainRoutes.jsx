import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../components/Landing';

export default (props) => (
  <Switch>
    <Route exact path='/'>
      <Landing signup={props.signup}/>
    </Route>
  </Switch>
);
