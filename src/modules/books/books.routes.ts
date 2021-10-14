import { Routes } from '../router';
import BookDetailsPage from './pages/BookDetailsPage';
import ListPage from './pages/ListPage';

export const booksRoutes: Routes = [
  {
    path: '/books',
    children: [
      {
        name: 'books.search',
        path: 'search/:query/:page?',
        component: ListPage,
      },
      {
        name: 'book.details',
        path: ':id',
        exact: true,
        component: BookDetailsPage,
      },
    ],
  },
];
