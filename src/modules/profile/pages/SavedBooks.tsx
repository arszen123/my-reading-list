import React, { useState } from 'react';
import {
  Stack, SimpleGrid,
} from '@chakra-ui/layout';
import { useUser } from '../../auth/hooks/auth';
import {
  useUserBookService,
} from '../hooks/user-books';
import { AsyncBookCard } from '../../books/components/AsyncBookCard';
import { StateFilter } from '../components/filters/StateFilter';
import { BookState } from '../types/book.type';

export const SavedBooks: React.FC = () => {
  const [
    filterState,
    setFilterState,
  ] = useState<BookState | undefined>(undefined);
  const user = useUser();
  const bookService = useUserBookService(user?.uid || '');

  const list = Object.entries(bookService.books)
    .filter(([, book]) => !filterState || book.state === filterState)
    .map(
      ([bookId]) => (
        <AsyncBookCard
          bookId={bookId}
        />
      ),
    );

  return (
    <>
      <Stack
        p="2"
        flex="1"
        justifyContent="center"
        direction="row"
        w="fit-content"
        margin="auto"
      >
        <StateFilter onChange={setFilterState} />
      </Stack>
      <SimpleGrid columns={[1, null, 2]} spacing={10}>
        {list}
      </SimpleGrid>
    </>
  );
};
