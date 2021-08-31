import { Button } from '@chakra-ui/button';
import {
  Center, SimpleGrid, Stack,
} from '@chakra-ui/layout';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import Card from '../components/Card';
import { useBooks } from '../hooks/books';
import { Book } from '../types';

type PathParams = {
  query: string,
  page: string,
};

const ListPage: React.FC = () => {
  const history = useHistory();
  const { query, page: pageFromPath = '1' } = useParams<PathParams>();
  const page = Math.max(parseInt(pageFromPath, 10), 1);
  const books = useBooks({ query, startIndex: (page - 1) * 10 });

  function handleNavigation(direction: number) {
    let newPage = page + direction;
    if (newPage < 1) {
      newPage = 1;
    }
    history.push(`/search/${query}/${newPage}`);
  }

  if (books.isLoading || books.error) {
    return (
      <SimpleGrid>
        Loading...
      </SimpleGrid>
    );
  }
  const list = books.data.map((book: Book) => <Card book={book} />);
  return (
    <>
      <SimpleGrid columns={[1, null, 2]} spacing={10}>
        {list}
      </SimpleGrid>
      <Center p={10}>
        <Stack direction="row" spacing={5}>
          <Button
            onClick={() => handleNavigation(-1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button onClick={() => handleNavigation(1)}>Next</Button>
        </Stack>
      </Center>
    </>
  );
};

export default ListPage;
