import { useQuery } from 'react-query';
import { Book } from '../types';

const BOOKS_BASE_URL = 'https://www.googleapis.com';

type Response<T> = {
  data: T,
  error: unknown,
  isLoading: boolean,
};

export function useBooks(
  { query, page }: {query: string, page: number},
): Response<Book[]> {
  const {
    data,
    error,
    isLoading,
  } = useQuery(
    `books.${query}.${page}`,
    () => fetch(
      `${BOOKS_BASE_URL}/books/v1/volumes?q=${query}&startIndex=${page}`,
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
