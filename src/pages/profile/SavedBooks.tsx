import React, { useState } from 'react';
import { Image } from '@chakra-ui/image';
import {
  Box, AspectRatio, Link, Stack, Center, SimpleGrid,
} from '@chakra-ui/layout';
import { Select } from '@chakra-ui/react';
import { useUser } from '../../hooks/auth';
import { useBook } from '../../hooks/books';
import {
  Book,
  BookState,
  BOOK_STATES,
  UserBooksService,
  useUserBooksService,
} from '../../hooks/user-books';
import { getTitle } from '../../shared/book';
import Rating from '../../components/Rating';
import Actions from '../../components/Actions';
import Card from '../../components/Card';

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
        <SavedBookRow
          bookId={bookId}
        />
      ),
    );

  return (
    <>
      <Box>
        <Stack p="2" flex="1" justifyContent="center" direction="row">
          <StateFilter onChange={setFilterState} />
        </Stack>
        <SimpleGrid columns={[1, null, 2]} spacing={10}>
          {list}
        </SimpleGrid>
      </Box>
    </>
  );
};

type SavedBookRowProps = {
  bookId: string;
};

const SavedBookRow: React.FC<SavedBookRowProps> = ({
  bookId,
}) => {
  const response = useBook(bookId);

  if (response.isLoading || response.error) {
    return (
      <Box>
        Loading...
      </Box>
    );
  }

  return <Card book={response.data} />;
};

type StateFilterProps = {
  onChange: (state: BookState | undefined) => void;
};

const StateFilter: React.FC<StateFilterProps> = ({ onChange }) => {
  const options = Object.entries(BOOK_STATES).map(
    ([key, value]) => <option key={key} value={key}>{value}</option>,
  );

  return (
    <Select
      w="sm"
      placeholder="All"
      onChange={(e) => onChange(e.target.value as BookState || undefined)}
    >
      {options}
    </Select>
  );
};
