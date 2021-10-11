import React from 'react';
import { Route } from 'react-router';
import { Routes } from '../router/components/Router';
import { LandingPage } from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';

export const IndexRouter: React.FC = () => (
  <>
    <Route path="/" exact>
      <LandingPage />
    </Route>
    <Route>
      <NotFoundPage />
    </Route>
  </>
);

export const indexRoutes: Routes = [
  {
    path: '/',
    exact: true,
    component: LandingPage,
  },
  {
    path: '',
    component: NotFoundPage,
  },
];
