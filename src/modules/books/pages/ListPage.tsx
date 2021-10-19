import { Button } from '@chakra-ui/button';
import {
  Center, SimpleGrid, Stack,
} from '@chakra-ui/layout';
import React from 'react';
import { tryParseInt } from '../../../utils/number';
import { useParams, useRouter } from '../../router';
import { Loading } from '../../shared/components/Loading';
import { Pager } from '../../shared/components/Pager';
import BookCard from '../components/BookCard';
import { useBooks } from '../hooks/books';
import { Book } from '../types/book.type';

type PathParams = {
  query: string,
  page: string,
};

const ListPage: React.FC = () => {
  const router = useRouter();
  const { query, page: pageFromPath } = useParams<PathParams>();
  const page = Math.max(tryParseInt(pageFromPath, 10), 1);
  const books = useBooks({ query, startIndex: (page - 1) * 10 });

  function handlePagination(newPage: number) {
    router.goto('books.search', {
      query,
      page: newPage,
    });
  }

  if (books.isLoading || books.error) {
    return <Loading />;
  }
  const list = books.data.map(
    (book: Book) => <BookCard key={book.id} book={book} />,
  );

  return (
    <>
      <SimpleGrid columns={[1, null, 2]} spacing={10}>
        {list}
      </SimpleGrid>
      <Pager page={page} onChange={handlePagination} />
    </>
  );
};

export default ListPage;
