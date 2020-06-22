import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';

const Guide = ({ match }: RouteComponentProps) => {
  const { path, Component } = routes[match.params.guide];
  return (
    <Switch>
      <Route exact path={path} component={Component} />
    </Switch>
  );
};

export default Guide;
