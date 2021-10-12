export type Book = {
  savedAt: Date;
  updatedAt: Date;
  state: BookState;
}

export type BookState =
'want_to_read' |
'ready_to_read' |
'reading' |
'finished';

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
