import React from 'react';
import { Image } from '@chakra-ui/image';
import {
  Box,
  Stack,
} from '@chakra-ui/layout';
import MOCK_DATA from '../mock.json';
import Rating from './Rating';
import Actions from './Actions';

const Card: React.FC = () => {
  const book = MOCK_DATA;
  const searchInfo = getSearchDescription(book);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Stack direction="row">
        <Image
          src={book.volumeInfo.imageLinks.smallThumbnail}
          alt={book.volumeInfo.title}
        />
        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
          >
            {book.volumeInfo.title}
            :
            {' '}
            {book.volumeInfo.subtitle}
          </Box>
          <Box
            mt="1"
            as="h4"
            lineHeight="tight"
            fontSize="sm"
            dangerouslySetInnerHTML={{ __html: searchInfo }}
            noOfLines={4}
          />
          <Stack direction="row" flex="1" pt="2">
            <Box flex="1" textAlign="center">
              <Rating
                rating={book.volumeInfo.averageRating}
                numOfRating={book.volumeInfo.ratingsCount}
              />
            </Box>
            <Box flex="1" textAlign="center">
              <Actions />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

function getSearchDescription(book: any) {
  let res = book.searchInfo?.textSnippet;
  if (!res) {
    res = book.volumeInfo.description;
  }
  return res;
}
export default Card;
