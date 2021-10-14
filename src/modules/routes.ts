import { booksRoutes } from './books/books.routes';
import { indexRoutes } from './index/index.routes';
import { profileRoutes } from './profile/profile.routes';
import { RouterService } from './router/services/router.service';

export const routes = [
  ...booksRoutes,
  ...profileRoutes,
  ...indexRoutes,
];

export const router = new RouterService(routes);
