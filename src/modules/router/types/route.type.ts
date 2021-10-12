export type BaseRoute = {
  path: string,
};

export type ComponentRoute = BaseRoute & {
  component: React.ComponentType;
  exact?: boolean;
}

export type NestedRoute = BaseRoute & {
  children: Routes;
}

export type Route = ComponentRoute | NestedRoute;

export type Routes = Route[];

export type ComponentRoutes = ComponentRoute[];
