import React, { useState } from 'react';
import {
  Stack, SimpleGrid,
} from '@chakra-ui/layout';
import { useUser } from '../../../hooks/auth';
import {
  BookState,
  useUserBooksService,
} from '../../../hooks/user-books';
import { SavedBookCard } from '../components/SavedBookCard';
import { StateFilter } from '../components/filters/StateFilter';

export const SavedBooks: React.FC = () => {
  const [
    filterState,
    setFilterState,
  ] = useState<BookState | undefined>(undefined);
  const user = useUser();
  const booksService = useUserBooksService(user?.uid || '');

  const list = Object.entries(booksService.books)
    .filter(([, book]) => !filterState || book.state === filterState)
    .map(
      ([bookId]) => (
        <SavedBookCard
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
