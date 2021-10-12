import { Routes } from '../router/types/route.type';
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
