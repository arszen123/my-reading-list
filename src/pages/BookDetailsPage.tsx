import { Image } from '@chakra-ui/image';
import {
  AspectRatio, Box, Stack, Text,
} from '@chakra-ui/layout';
import React from 'react';
import Actions from '../components/Actions';
import Rating from '../components/Rating';
import SimpleDataTable from '../components/SimpleDataTable';
import MOCK_DATA from '../mock.json';
import { getTitle, getDetails } from '../shared/book';
import { Book } from '../types';

const BookDetailsPage: React.FC = () => {
  const book: Book = MOCK_DATA;
  const title = getTitle(book);
  const details = getDetails(book);

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
          {book.volumeInfo.description}
        </Box>
        <SimpleDataTable rows={details} />
      </Box>
    </Stack>
  );
};

export default BookDetailsPage;
