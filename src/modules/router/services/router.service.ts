import {
  Routes, ComponentRoutes, ComponentRoute, RouteParams,
} from '../types/route.type';
import { flattenRoutes } from '../utils/flatten-routes';

export class RouterService {
  private readonly routes: ComponentRoutes;

  constructor(routes: Routes) {
    this.routes = flattenRoutes(routes);
  }

  /**
   * Returns the component route by it's name or undefined if not found
   *
   * @param name Route name
   * @returns Component route or undefined if not found
   */
  getRoute(name: string): ComponentRoute | undefined {
    return this.routes.find((route) => route.name === name);
  }

  /**
   * Returns all the registered component routes.
   *
   * @returns Component routes
   */
  getRoutes(): ComponentRoutes {
    return this.routes;
  }

  /**
   * Compiles route with parameters.
   *
   * @param name Route name
   * @param params Route params
   * @returns Compiled route
   */
  compile(name: string, params: RouteParams = {}): string {
    const route = this.getRoute(name);
    if (typeof route === 'undefined') {
      throw new Error(`Route not found ${name}`);
    }

    let hasMissingOptionalParam = false;

    const path = route.path.replace(
      /:([a-zA-Z0-9]+)(\?|)/gi,
      (match, paramName) => {
        const isOptional = match[match.length - 1] === '?';

        if (isOptional && !params[paramName]) {
          hasMissingOptionalParam = true;

          return '';
        }

        if (isOptional && hasMissingOptionalParam) {
          throw new Error('Can\'t compile route. Missing optional parameter');
        }

        return `${params[paramName]}`;
      },
    );

    return removeTrailingSlashes(path);
  }
}

const removeTrailingSlashes = (str: string): string => {
  let tmpStr = str;
  while (tmpStr[tmpStr.length - 1] === '/') {
    tmpStr = tmpStr.substring(0, tmpStr.length - 1);
  }

  return tmpStr;
};
