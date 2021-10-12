import React from 'react';
import { Route as ReactRoute, Switch } from 'react-router';
import { flattenRoutes } from '../services/route.service';
import { Routes } from '../types/route.type';

type RouterPros = {
  routes: Routes;
};

export const Router: React.FC<RouterPros> = ({ routes }) => {
  const routesList = flattenRoutes(routes)
    .map(
      (route) => (
        <ReactRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      ),
    );

  return (
    <>
      <Switch>
        {routesList}
      </Switch>
    </>
  );
};
