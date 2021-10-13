import { Routes } from '../router';
import { LandingPage } from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';

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
