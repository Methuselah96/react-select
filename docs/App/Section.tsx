import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

import routes from './routes';

const Section = () => {
  const routeKeys = Object.keys(routes);
  return (
    <Switch>
      {routeKeys.map((r) => (
        <Route key={r} path={r} render={(p) => <Content {...p} />} />
      ))}
      <Redirect from="/" to="/home" />
    </Switch>
  );
};

const Content = ({ location, match }: RouteComponentProps) => {
  const page = routes[match.path as keyof typeof routes];

  return (
    <Route
      path={match.path}
      render={() => (
        <Switch>
          <Route exact key={location.key} path={match.path} component={page} />
        </Switch>
      )}
    />
  );
};

export default Section;
