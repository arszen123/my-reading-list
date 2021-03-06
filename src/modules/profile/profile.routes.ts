import { Routes } from '../router';
import { SavedBooks } from './pages/SavedBooks';

export const profileRoutes: Routes = [
  {
    path: '/profile/saved-books',
    name: 'profile.saved-books',
    component: SavedBooks,
    exact: true,
  },
];
