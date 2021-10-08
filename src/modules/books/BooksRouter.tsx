import React from 'react';
import { Route } from 'react-router';
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
