import React from 'react';
import { Image } from '@chakra-ui/image';
import {
  AspectRatio,
  Box,
  Stack,
} from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import Rating from '../../shared/components/Rating';
import Actions from './Actions';
import { Book } from '../types/book.type';
import { getTitle, getSearchDescription } from '../services/book.service';
import noBookCoverImage from '../../../assets/no_book_cover.jpg';
import { useUser } from '../../auth';
import { useUserBookService } from '../../profile';

type Props = {
  book: Book;
};

const BookCard: React.FC<Props> = ({ book }) => {
  const user = useUser();
  const bookService = useUserBookService(user?.uid || '');
  const savedBook = bookService.findById(book.id);
  const searchInfo = getSearchDescription(book);
  const title = getTitle(book);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="5"
      shadow="lg"
    >
      <Stack direction={['column', 'row']}>
        <AspectRatio
          maxW="400px"
          minW="100px"
          ratio={1 / 1.6}
          m="auto"
        >
          <Link to={`/books/${book.id}`}>
            <Image
              w="100%"
              objectFit="cover"
              src={book.volumeInfo.imageLinks?.thumbnail ?? noBookCoverImage}
              alt={title}
            />
          </Link>
        </AspectRatio>
        <Box pl="4">
          <Link to={`/books/${book.id}`}>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
            >
              {title}
            </Box>
          </Link>
          <Box
            mt="4"
            mb="4"
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
              <Actions
                onRemove={() => bookService.remove(book.id)}
                onStateChange={
                  (state) => bookService.updateState(book.id, state)
                }
                state={savedBook?.state}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default BookCard;
