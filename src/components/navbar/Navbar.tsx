import React from 'react';
import { Button } from '@chakra-ui/button';
import { Box, Stack } from '@chakra-ui/layout';
import { useHistory } from 'react-router';
import Searchbox from './Searchbox';
import ColorModeToggle from './ColorModeToggle';

const Navbar: React.FC = () => {
  const history = useHistory();
  // eslint-disable-next-line
  function handleSubmit(text: string) {
    history.push(`/search/${text}`);
  }
  return (
    <Box
      textAlign="center"
      boxShadow="lg"
      p={5}
      pb={2}
      borderBottomWidth="1px"
    >
      <Stack
        spacing={[2, null, 8]}
        direction={['column', 'row']}
        justifyContent="flex-end"
      >
        <Searchbox onSubmit={handleSubmit} />
        <Stack direction={['column', 'row']}>
          <ColorModeToggle />
          <Button colorScheme="teal">
            Login
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Navbar;
