import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './login';

export default () => <Switch>
  <Route exact path="/login">
    <Login />
  </Route>
</Switch>
