import {
  getDatabase,
  ref,
  child,
  update,
  onValue,
  remove,
} from 'firebase/database';
import { useEffect, useState } from 'react';
import { Observer } from '../utils/observer/observer';
import { Subject } from '../utils/observer/subject';

export type BookState =
'want_to_read' |
'ready_to_read' |
'reading' |
'finished';

export type Book = {
  savedAt: Date;
  updatedAt: Date;
  state: BookState;
}

export type Books = {
  [key: string]: Book;
};

export type UserBooksService = {
  updateState: (bookId: string, state: BookState) => Promise<void>;
  remove: (bookId: string) => Promise<void>;
  findById: (bookId: string) => Book | undefined;
  books: Books;
}

export const BOOK_STATES: {[K in BookState]: string} = {
  want_to_read: 'Want to read',
  ready_to_read: 'Ready to read',
  reading: 'Reading',
  finished: 'Finished',
};

export const useUserBooksService = (uid: string): UserBooksService => {
  const userBooks = useUserBooks(uid);
  const booksDbRef = ref(getDatabase(), `users/${uid}/books`);

  return {
    updateState: (bookId: string, state: BookState) => {
      const bookDbRef = child(booksDbRef, bookId);

      return update(bookDbRef, {
        state,
        udatedAt: new Date(),
      });
    },
    remove: (bookId: string) => {
      const bookDbRef = child(booksDbRef, bookId);

      return remove(bookDbRef);
    },
    findById: (bookId: string) => userBooks[bookId],
    books: userBooks,
  };
};

// Probably there is a better solution for this.
const subscriptions = new Map<string, Subject<Books>>();

export const useUserBooks = (uid: string): Books => {
  const [books, setBooks] = useState<Books>({});
  const dbPath = `users/${uid}/books`;

  // subscribe to dbPath changes and notify observers about it
  useEffect(() => {
    if (!subscriptions.has(dbPath)) {
      const subject = new Subject<Books>();
      const booksDbRef = ref(getDatabase(), dbPath);
      const unsubscribe = onValue(booksDbRef, (snapshot) => {
        const data = snapshot.val();
        subject.next(data || {});

        // TODO unsubscribe when there are no observers
      });
      subscriptions.set(dbPath, subject);
    }
  }, [dbPath]);

  // register observer
  useEffect(() => {
    const observer = new Observer<Books>(setBooks);
    const subject = subscriptions.get(dbPath) as Subject<Books>;
    subject.register(observer);

    return () => {
      subject.unregister(observer);
    };
  }, [setBooks, dbPath]);

  return books;
};
