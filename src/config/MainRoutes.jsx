import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../components/Landing';
import DeckInfoContainer from '../components/DeckInfoContainer';

export default (props) => (
  <Switch>
    <Route path='/'>
      {props.currentUsername
        ?
        <DeckInfoContainer />
        :
        <Landing
          signup={props.signup}
          setCurrentUser={props.setCurrentUser}
        />
      }
    </Route>
  </Switch>
);
