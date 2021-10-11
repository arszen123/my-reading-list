import React from 'react';
import { Route } from 'react-router';
import { Routes } from '../router/components/Router';
import BookDetailsPage from './pages/BookDetailsPage';
import ListPage from './pages/ListPage';

export const BooksRouter: React.FC = () => (
  <>
    <Route path="/search/:query/:page?">
      <ListPage />
    </Route>
    <Route path="/books/:id" exact>
      <BookDetailsPage />
    </Route>
  </>
);

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
