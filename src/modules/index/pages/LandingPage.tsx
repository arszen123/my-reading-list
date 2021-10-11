import React from 'react';
import { Box } from '@chakra-ui/layout';
import { useHistory } from 'react-router';
import Searchbox from '../../navbar/components/Searchbox';

export const LandingPage: React.FC = () => {
  const history = useHistory();

  const handleSearch = (text: string) => {
    history.push(`/search/${text}`);
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
