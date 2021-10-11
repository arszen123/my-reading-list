import React from 'react';
import { Route } from 'react-router';
import { Routes } from '../router/components/Router';
import { SavedBooks } from './pages/SavedBooks';

export const ProfileRouter: React.FC = () => (
  <>
    <Route path="/profile/saved-books" exact>
      <SavedBooks />
    </Route>
  </>
);

export const profileRoutes: Routes = [
  {
    path: '/profile/saved-books',
    component: SavedBooks,
    exact: true,
  },
];
