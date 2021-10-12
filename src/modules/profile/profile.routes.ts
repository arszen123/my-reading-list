import { Routes } from '../router/types/route.type';
import { SavedBooks } from './pages/SavedBooks';

export const profileRoutes: Routes = [
  {
    path: '/profile/saved-books',
    component: SavedBooks,
    exact: true,
  },
];
