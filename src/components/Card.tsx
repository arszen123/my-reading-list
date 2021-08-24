import React from 'react';
import { Image } from '@chakra-ui/image';
import {
  AspectRatio,
  Box,
  Stack,
} from '@chakra-ui/layout';
import MOCK_DATA from '../mock.json';
import Rating from './Rating';
import Actions from './Actions';
import { Book } from '../types';

const Card: React.FC = () => {
  const book: Book = MOCK_DATA;
  const searchInfo = getSearchDescription(book);
  const title = getTitle(book);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="5"
    >
      <Stack direction={['column', 'row']}>
        <AspectRatio
          maxW="400px"
          minW="100px"
          ratio={1 / 1.6}
          m="auto"
        >
          <Image
            w="100%"
            objectFit="cover"
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={title}
          />
        </AspectRatio>
        <Box pl="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
          >
            {title}
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

function getSearchDescription(book: Book) {
  let res = book.searchInfo?.textSnippet;
  if (!res) {
    res = book.volumeInfo.description;
  }
  return res;
}

function getTitle(book: Book) {
  let { title } = book.volumeInfo;
  const { subtitle } = book.volumeInfo;
  if (subtitle) {
    title += `: ${subtitle}`;
  }
  return title;
}

export default Card;
