import { Image } from '@chakra-ui/image';
import {
  AspectRatio, Box, Stack, Text,
} from '@chakra-ui/layout';
import React from 'react';
import { useParams } from 'react-router';
import Actions from '../components/Actions';
import Rating from '../../shared/components/Rating';
import SimpleDataTable from '../../shared/components/SimpleDataTable';
import { useBook } from '../hooks/books';
import {
  getTitle,
  getDetails,
  getSearchDescription,
} from '../services/book.service';
import { Book } from '../types/book.type';
import noBookCoverImage from '../../../assets/no_book_cover.jpg';
import { useUserBookService } from '../../profile/hooks/user-books';
import { useUser } from '../../auth/hooks/auth';

type PathParams = {
  id: string;
};

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<PathParams>();
  const bookResponse = useBook(id);
  const user = useUser();
  const bookService = useUserBookService(user?.uid || '');

  if (
    bookResponse.isLoading
    || bookResponse.error
    || (bookResponse.data as any)?.error
  ) {
    return (
      <Box>
        Loading...
      </Box>
    );
  }

  const book: Book = bookResponse.data;
  const savedBook = bookService.findById(book.id);
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
            src={book.volumeInfo.imageLinks?.thumbnail ?? noBookCoverImage}
            alt={title}
          />
        </AspectRatio>
        <Box pt="2">
          <Rating
            numOfRating={book.volumeInfo.ratingsCount}
            rating={book.volumeInfo.averageRating}
          />
          <Actions
            onRemove={() => bookService.remove(book.id)}
            onStateChange={(state) => bookService.updateState(book.id, state)}
            state={savedBook?.state}
          />
        </Box>
      </Box>
      <Box>
        <Text as="h1" fontSize="2xl" fontWeight="bold">{title}</Text>
        <Box pt="2" pb="2" dangerouslySetInnerHTML={{ __html: description }} />
        <SimpleDataTable rows={details} />
      </Box>
    </Stack>
  );
};

export default BookDetailsPage;
