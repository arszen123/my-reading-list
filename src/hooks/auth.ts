import { useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

export const useUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  onAuthStateChanged(auth, (u) => {
    setUser(u);
  });

  return user;
};
