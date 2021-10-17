import { useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  Unsubscribe,
  User,
} from 'firebase/auth';
import { Subject } from '../../../utils/observer/subject';
import { Observer } from '../../../utils/observer/observer';

export type UserResponse = {
  user: User | null;
  isLoading: boolean;
};

let subscription: Unsubscribe | null = null;
const subject = new Subject<UserResponse>();

export const useUser = (): UserResponse => {
  const [user, setUser] = useState<UserResponse>({
    user: null,
    isLoading: true,
  });
  // subscribe to dbPath changes and notify observers about it
  useEffect(() => {
    if (subscription === null) {
      const auth = getAuth();
      subscription = onAuthStateChanged(auth, (u) => {
        subject.next({ user: u, isLoading: false });
      }, () => subject.next({ user: null, isLoading: false }));
    }
  }, []);

  // register observer
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (subscription) {
      const observer = new Observer<UserResponse>(setUser);
      subject.register(observer);

      return () => {
        subject.unregister(observer);
      };
    }
  }, [setUser]);

  return user;
};
