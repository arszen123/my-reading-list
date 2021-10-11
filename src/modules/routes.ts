import { booksRoutes } from './books/BooksRouter';
import { indexRoutes } from './index/IndexRouter';
import { profileRoutes } from './profile/ProfileRouter';

export const routes = [
  ...booksRoutes,
  ...profileRoutes,
  ...indexRoutes,
];
