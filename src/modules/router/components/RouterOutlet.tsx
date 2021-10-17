import React, { useContext } from 'react';
import {
  Switch as ReactRouterSwitch,
  Route as ReactRouterRoute,
} from 'react-router-dom';
import { RouterContext } from '../context/route.context';

export const RouterOutlet: React.FC = () => {
  const router = useContext(RouterContext);
  const routesList = router.getRoutes()
    .map(
      (route) => (
        <ReactRouterRoute
          path={route.path}
          exact={route.exact}
          component={route.component}
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
