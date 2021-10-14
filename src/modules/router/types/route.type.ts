export type BaseRoute = {
  /**
   * Route Path
   */
  path: string,
};

export type ComponentRoute = BaseRoute & {
  /**
   * Unique identifier of the route
   */
  name?: string;
  /**
   * Match the route exactly or partialy.
   */
  exact?: boolean;

  /**
   * Route component to render
   */
  component: React.ComponentType;
}

export type NestedRoute = BaseRoute & {
  /**
   * Nested route children roots
   */
  children: Routes;
}

export type Route = ComponentRoute | NestedRoute;

export type Routes = Route[];

export type ComponentRoutes = ComponentRoute[];

export type RouteParams = Record<string, string | number>;
