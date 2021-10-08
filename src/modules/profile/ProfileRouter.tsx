import React from 'react';
import { Route } from 'react-router';
import { SavedBooks } from './pages/SavedBooks';

export const ProfileRouter: React.FC = () => (
  <>
    <Route path="/profile/saved-books" exact>
      <SavedBooks />
    </Route>
  </>
);
