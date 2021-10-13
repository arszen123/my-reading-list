import { Routes } from '../router';
import BookDetailsPage from './pages/BookDetailsPage';
import ListPage from './pages/ListPage';

export const booksRoutes: Routes = [
  {
    path: '/books',
    children: [
      {
        path: 'search/:query/:page?',
        component: ListPage,
      },
      {
        path: ':id',
        exact: true,
        component: BookDetailsPage,
      },
    ],
  },
];
