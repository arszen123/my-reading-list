import { DatabaseReference, onValue } from '@firebase/database';
import { useEffect, useState } from 'react';
import { Observer } from '../../utils/observer/observer';
import { Subject } from '../../utils/observer/subject';

// Probably there is a better solution for this.
const subscriptions = new Map<string, Subject<unknown>>();

// TODO!: add proper typing
export const useDatabase = <T>(
  dbRef: DatabaseReference | undefined,
  initialValue?: T,
): T | undefined => {
  const [value, setValue] = useState<T | undefined>(initialValue);
  const key = dbRef?.toString() || '';

  // subscribe to dbPath changes and notify observers about it
  useEffect(() => {
    if (!subscriptions.has(key) && dbRef) {
      const subject = new Subject<T>();
      const unsubscribe = onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        subject.next(data);

        // TODO!: unsubscribe when there are no observers
      });
      subscriptions.set(key, subject as Subject<unknown>);
    }
  }, [dbRef, key]);

  // register observer
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (subscriptions.has(key)) {
      const observer = new Observer<T>(setValue);
      const subject = subscriptions.get(key) as Subject<T>;
      subject.register(observer);

      return () => {
        subject.unregister(observer);
      };
    }
  }, [setValue, key]);

  return value;
};
