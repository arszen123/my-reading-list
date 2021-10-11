import React from 'react';
import { useBook } from '../../../hooks/books';
import Card from '../../shared/components/Card';
import CardSkeleton from '../../shared/components/CardSkeleton';

type SavedBookCardProps = {
  bookId: string;
};

export const SavedBookCard: React.FC<SavedBookCardProps> = ({
  bookId,
}) => {
  const response = useBook(bookId);

  if (response.isLoading || response.error) {
    return (
      <CardSkeleton />
    );
  }

  return <Card book={response.data} />;
};
