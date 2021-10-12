import { useQuery } from 'react-query';
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
  );

  return {
    data,
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
  );

  return {
    data,
    error,
    isLoading,
  };
}
