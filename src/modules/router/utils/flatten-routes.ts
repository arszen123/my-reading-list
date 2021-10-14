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
      return flattenRoutes(route.children, concatPath(path, route.path));
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
).map((route) => {
  let cleanPath = route.path.replace(/(\/+)/ig, '/');
  if (cleanPath.length > 1) {
    cleanPath = cleanPath.replace(/\/$/, '');
  }

  return {
    ...route,
    // Remove unnecessary "/"-es
    path: cleanPath,
  };
});

const isNestedRoute = (
  route: Route,
): route is NestedRoute => 'children' in route;

const concatPath = (
  path0: string,
  path1: string,
) => {
  let glue = '/';
  if (canPathsBeSimplyConcatenated(path0, path1)) {
    glue = '';
  }

  return path0 + glue + path1;
};

/**
 * Does path0 and path1 can concatenated to a valid route without "/".
 * Can be concatenated:
 *  1. path0 ends with "/"
 *  2. path1 starts with "/"
 *  3. path1 is empty
 */
const canPathsBeSimplyConcatenated = (
  path0: string,
  path1: string,
): boolean => hasSlash(path0, false)
  || hasSlash(path1)
  || path1.length === 0;

const hasSlash = (
  str: string,
  isBeginning = true,
) => (isBeginning ? str[0] : str[str.length - 1]) === '/';
