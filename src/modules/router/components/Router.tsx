import React from 'react';
import { Route as ReactRoute, Switch } from 'react-router';

type BaseRoute = {
  path: string,
};

type ComponentRoute = BaseRoute & {
  component: React.ComponentType;
  exact?: boolean;
}

type NestedRoute = BaseRoute & {
  children: Routes;
}

export type Route = ComponentRoute | NestedRoute;

export type Routes = Route[];

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

const isNestedRoute = (
  route: Route,
): route is NestedRoute => 'children' in route;

const hasSlash = (
  str: string,
  isBeginning = true,
) => (isBeginning ? str[0] : str[str.length - 1]) === '/';

const concatPath = (
  path0: string,
  path1: string,
) => {
  let glue = '/';
  if (hasSlash(path0, false) || hasSlash(path1)) {
    glue = '';
  }

  return path0 + glue + path1;
};

type ComponentRoutes = ComponentRoute[];

const flattenRoutes = (
  routes: Routes,
  path = '',
): ComponentRoutes => routes.map(
  (route) => {
    if (isNestedRoute(route)) {
      return flattenRoutes(route.children, route.path);
    }

    return {
      ...route,
      path: concatPath(path, route.path),
    };
  },
).reduce(
  (
    p: ComponentRoutes,
    c: ComponentRoutes | ComponentRoute,
  ) => [...p, ...(Array.isArray(c) ? c : [c])],
  [],
);
