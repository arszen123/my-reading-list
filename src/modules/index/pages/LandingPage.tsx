import React, { useContext } from 'react';
import { Box } from '@chakra-ui/layout';
import Searchbox from '../../shared/components/Searchbox';
import { useRouter } from '../../router';

export const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleSearch = (text: string) => {
    router.goto('books.search', {
      query: text,
    });
  };

  return (
    <Box
      pt="16"
      textAlign="center"
    >
      <Box
        as="h1"
        lineHeight="tight"
        fontSize="4xl"
        fontWeight="bold"
      >
        What is your favourite book?
      </Box>
      <Box>
        <Searchbox onSubmit={handleSearch} />
      </Box>
    </Box>
  );
};
