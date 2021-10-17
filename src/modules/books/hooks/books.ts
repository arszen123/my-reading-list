import { useQuery, useQueryClient } from 'react-query';
import { Book } from '../types/book.type';

const BOOKS_BASE_URL = 'https://www.googleapis.com';

type Response<T> = {
  data: T,
  error: unknown,
  isLoading: boolean,
};

export function useBooks(
  { query, startIndex }: {query: string, startIndex: number},
): Response<Book[]> {
  const queryClient = useQueryClient();
  const {
    data,
    error,
    isLoading,
  } = useQuery(
    `books.${query}.${startIndex}`,
    () => fetch(
      `${BOOKS_BASE_URL}/books/v1/volumes?q=${query}&startIndex=${startIndex}`,
    ).then((res) => res.json())
      .then((res) => res.items),
    { staleTime: Infinity },
  );

  const books = Array.isArray(data) ? data : [];
  books.forEach((book: Book) => {
    queryClient.setQueryData(`book.${book.id}`, book);
  });

  return {
    data: books,
    error,
    isLoading,
  };
}

export function useBook(id: string): Response<Book> {
  const {
    data,
    error,
    isLoading,
  } = useQuery(
    `book.${id}`,
    () => fetch(
      `${BOOKS_BASE_URL}/books/v1/volumes/${id}`,
    ).then((res) => res.json()),
    { staleTime: Infinity },
  );

  return {
    data,
    error,
    isLoading,
  };
}
