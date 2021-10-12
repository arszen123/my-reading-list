import {
  ComponentRoute,
  ComponentRoutes,
  NestedRoute,
  Route,
  Routes,
} from '../types/route.type';

export const flattenRoutes = (
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
