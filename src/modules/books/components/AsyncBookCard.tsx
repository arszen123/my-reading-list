import React from 'react';
import { useBook } from '../hooks/books';
import BookCard from './BookCard';
import BookCardSkeleton from './BookCardSkeleton';

type SavedBookCardProps = {
  bookId: string;
};

export const AsyncBookCard: React.FC<SavedBookCardProps> = ({
  bookId,
}) => {
  const response = useBook(bookId);

  if (response.isLoading || response.error) {
    return (
      <BookCardSkeleton />
    );
  }

  return <BookCard book={response.data} />;
};
