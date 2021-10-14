import React, { useContext } from 'react';
import { Box } from '@chakra-ui/layout';
import { useHistory } from 'react-router';
import Searchbox from '../../shared/components/Searchbox';
import { RouterContext } from '../../router';

export const LandingPage: React.FC = () => {
  const history = useHistory();
  const router = useContext(RouterContext);

  const handleSearch = (text: string) => {
    history.push(router.compile('books.search', {
      query: text,
    }));
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
