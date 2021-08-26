import { Image } from '@chakra-ui/image';
import {
  AspectRatio, Box, Stack, Text,
} from '@chakra-ui/layout';
import React from 'react';
import { useParams } from 'react-router';
import Actions from '../components/Actions';
import Rating from '../components/Rating';
import SimpleDataTable from '../components/SimpleDataTable';
import { useBook } from '../hooks/books';
import { getTitle, getDetails, getSearchDescription } from '../shared/book';
import { Book } from '../types';

type PathParams = {
  id: string;
};

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<PathParams>();
  const bookResponse = useBook(id);
  if (bookResponse.isLoading || bookResponse.error) {
    return (
      <Box>
        Loading...
      </Box>
    );
  }
  const book: Book = bookResponse.data;
  const title = getTitle(book);
  const details = getDetails(book);
  const description = book.volumeInfo.description ?? getSearchDescription(book);

  return (
    <Stack direction={['column', 'row']} spacing="32px">
      <Box
        textAlign="center"
      >
        <AspectRatio
          margin="auto"
          maxW="250px"
          ratio={1.1 / 1.6}
        >
          <Image
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={title}
          />
        </AspectRatio>
        <Box pt="2">
          <Rating
            numOfRating={book.volumeInfo.ratingsCount}
            rating={book.volumeInfo.averageRating}
          />
          <Actions />
        </Box>
      </Box>
      <Box>
        <Text as="h1" fontSize="2xl" fontWeight="bold">{title}</Text>
        <Box pt="2" pb="2">
          {description}
        </Box>
        <SimpleDataTable rows={details} />
      </Box>
    </Stack>
  );
};

export default BookDetailsPage;
