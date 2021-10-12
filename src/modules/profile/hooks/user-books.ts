import {
  getDatabase,
  ref,
  child,
  update,
  remove,
} from 'firebase/database';
import { useDatabase } from '../../../hooks/firebase/database';
import {
  Book,
  Books,
  BookState,
  UserBooksService,
} from '../types/book.type';

export const useUserBookService = (uid?: string): UserBooksService => {
  const userBooks = useUserBooks(uid);
  const booksDbRef = ref(getDatabase(), `users/${uid}/books`);

  const assertAuthorized = (action: string) => {
    if (!uid) {
      throw new Error(`${action} Unauthorized`);
    }
  };
  const findById = (bookId: string) => userBooks[bookId];

  return {
    updateState: (bookId: string, state: BookState) => {
      assertAuthorized('Can\'t perform book update.');
      const bookDbRef = child(booksDbRef, bookId);

      const book: Book = findById(bookId);
      const updatedBook: Book = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        savedAt: new Date(),
        ...book,
        state,
        updatedAt: new Date(),
      };

      return update(bookDbRef, updatedBook);
    },
    remove: (bookId: string) => {
      assertAuthorized('Can\'t perform book deletion.');
      const bookDbRef = child(booksDbRef, bookId);

      return remove(bookDbRef);
    },
    findById,
    books: userBooks,
  };
};

export const useUserBooks = (uid?: string): Books => {
  const dbPath = `users/${uid}/books`;
  const booksDbRef = ref(getDatabase(), dbPath);

  return useDatabase<Books>(uid ? booksDbRef : undefined, {}) as Books;
};
