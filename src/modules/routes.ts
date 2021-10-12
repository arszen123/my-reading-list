import { booksRoutes } from './books/books.routes';
import { indexRoutes } from './index/index.routes';
import { profileRoutes } from './profile/profile.routes';

export const routes = [
  ...booksRoutes,
  ...profileRoutes,
  ...indexRoutes,
];
