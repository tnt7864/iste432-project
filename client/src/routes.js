import React from 'react';
import { Switch, Route } from 'react-router';
import { Login } from './components/Login';

export const routes = [
  {
    label: "Ingredients",
    path: "/ingredients",
    exact: true,
    component: React.Fragment
  },
  {
    label: "Products",
    path: "/products",
    exact: true,
    component: React.Fragment
  },
  {
    label: "Ingredients",
    path: "/ingredients",
    exact: true,
    component: React.Fragment
  },
]

export default () => <Switch>
  <Route exact path="/login">
    <Login />
  </Route>
</Switch>
