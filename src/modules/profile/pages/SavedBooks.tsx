import React, { useState } from 'react';
import {
  Stack, SimpleGrid,
} from '@chakra-ui/layout';
import { Redirect } from 'react-router';
import { AuthGuard, useUser } from '../../auth';
import {
  useUserBookService,
} from '../hooks/user-books';
import { AsyncBookCard } from '../../books';
import { StateFilter } from '../components/filters/StateFilter';
import { BookState } from '../types/book.type';
import { useParams, useRouter } from '../../router';
import { Pager } from '../../shared/components/Pager';
import { tryParseInt } from '../../../utils/number';

const SavedBooksComponent: React.FC = () => {
  const [
    filterState,
    setFilterState,
  ] = useState<BookState | undefined>(undefined);
  const router = useRouter();
  const { user } = useUser();
  const bookService = useUserBookService(user?.uid || '');
  const { page: pageFromPath } = useParams<{ page: string }>();

  const numOfItemsPerPage = 10;
  const page = Math.max(tryParseInt(pageFromPath, 10), 1);
  const numOfBooks = Object.entries(bookService.books).length;
  const lastPage = Math.max(Math.ceil(numOfBooks / numOfItemsPerPage), 1);
  const startIndex = (page - 1) * numOfItemsPerPage;

  function handlePagination(newPage: number) {
    router.goto('profile.saved-books', {
      page: newPage,
    });
  }
  if (startIndex >= numOfBooks && numOfBooks) {
    return (
      <Redirect to={router.compile('profile.saved-books', {
        page: lastPage,
      })}
      />
    );
  }

  const list = Object.entries(bookService.books)
    .filter(([, book]) => !filterState || book.state === filterState)
    // show only 10 books per page
    .slice(startIndex, startIndex + numOfItemsPerPage)
    .map(
      ([bookId]) => (
        <AsyncBookCard
          key={bookId}
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
      <Pager page={page} maxPage={lastPage} onChange={handlePagination} />
    </>
  );
};

export const SavedBooks = AuthGuard(SavedBooksComponent, 'index');
