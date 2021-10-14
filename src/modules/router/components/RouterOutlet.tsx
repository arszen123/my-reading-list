import React, { useContext } from 'react';
import {
  Route as ReactRouterRoute,
  Switch as ReactRouterSwitch,
} from 'react-router';
import { RouterContext } from '../context/route.context';

export const RouterOutlet: React.FC = () => {
  const router = useContext(RouterContext);
  const routesList = router.getRoutes()
    .map(
      (route) => (
        <ReactRouterRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      ),
    );

  return (
    <>
      <ReactRouterSwitch>
        {routesList}
      </ReactRouterSwitch>
    </>
  );
};
