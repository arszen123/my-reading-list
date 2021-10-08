import React, { useState } from 'react';
import {
  Stack, SimpleGrid,
} from '@chakra-ui/layout';
import { Select } from '@chakra-ui/react';
import { useUser } from '../../../hooks/auth';
import { useBook } from '../../../hooks/books';
import {
  BookState,
  BOOK_STATES,
  useUserBooksService,
} from '../../../hooks/user-books';
import Card from '../../shared/components/Card';
import CardSkeleton from '../../shared/components/CardSkeleton';

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

type SavedBookRowProps = {
  bookId: string;
};

const SavedBookRow: React.FC<SavedBookRowProps> = ({
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

type StateFilterProps = {
  onChange: (state: BookState | undefined) => void;
};

const StateFilter: React.FC<StateFilterProps> = ({ onChange }) => {
  const options = Object.entries(BOOK_STATES).map(
    ([key, value]) => <option key={key} value={key}>{value}</option>,
  );

  return (
    <Select
      w="200px"
      placeholder="All"
      onChange={(e) => onChange(e.target.value as BookState || undefined)}
    >
      {options}
    </Select>
  );
};
